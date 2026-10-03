import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

/** Owns graphics only; network sessions and tool delivery belong to React. */
export async function createRobotScene(container, catalog, signal) {
    const gltf = await new GLTFLoader().loadAsync(catalog.asset);
    const disposeModel = () => gltf.scene.traverse(object => {
        object.geometry?.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.filter(Boolean).forEach(material => material.dispose());
    });
    if (signal.aborted) { disposeModel(); throw new Error('场景已关闭'); }
    // Facial tracks in the upstream animations would overwrite the selected expression every frame.
    const clips = new Map(gltf.animations.map(source => {
        const clip = source.clone();
        clip.tracks = clip.tracks.filter(track => !track.name.endsWith(".morphTargetInfluences"));
        return [clip.name, clip];
    }));
    const faces = [];
    gltf.scene.traverse(object => { if (object.morphTargetDictionary) faces.push(object); });
    if (catalog.poses.some(pose => !clips.has(pose.clip))
        || catalog.expressions.some(expression => expression.morph && !faces.some(face => expression.morph in face.morphTargetDictionary))) {
        disposeModel(); throw new Error('模型与动作目录不兼容');
    }
    let renderer;
    try { renderer = new THREE.WebGLRenderer({antialias: true, alpha: true}); }
    catch (error) { disposeModel(); throw error; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xffffff, 0x546779, 3));
    const light = new THREE.DirectionalLight(0xffffff, 3); light.position.set(3, 5, 5); scene.add(light);
    scene.add(gltf.scene);
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(center.x, center.y, center.z + Math.max(size.y, size.x) * 2.1);
    camera.lookAt(center);
    const mixer = new THREE.AnimationMixer(gltf.scene);
    const actions = new Map(catalog.poses.map(pose => [pose.id, mixer.clipAction(clips.get(pose.clip))]));
    let current;
    const apply = (poseId, expressionId) => {
        const pose = catalog.poses.find(item => item.id === poseId);
        const expression = catalog.expressions.find(item => item.id === expressionId);
        if (!pose || !expression) throw new Error('未知动作或表情');
        mixer.stopAllAction();
        current = actions.get(poseId);
        current.reset().setLoop(pose.loop ? THREE.LoopRepeat : THREE.LoopOnce, pose.loop ? Infinity : 1);
        current.clampWhenFinished = !pose.loop; current.play();
        faces.forEach(face => {
            face.morphTargetInfluences.fill(0);
            if (expression.morph in face.morphTargetDictionary) face.morphTargetInfluences[face.morphTargetDictionary[expression.morph]] = 1;
        });
    };
    mixer.addEventListener('finished', () => {
        if (current !== actions.get('idle')) { mixer.stopAllAction(); current = actions.get('idle'); current.reset().setLoop(THREE.LoopRepeat, Infinity).play(); }
    });
    apply('idle', 'neutral');
    const resize = () => {
        const width = Math.max(container.clientWidth, 1), height = Math.max(container.clientHeight, 1);
        camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height);
    };
    const observer = new ResizeObserver(resize); observer.observe(container); resize();
    let previous = performance.now();
    renderer.setAnimationLoop(now => { mixer.update(Math.min((now - previous) / 1000, 0.1)); previous = now; renderer.render(scene, camera); });
    return {apply, dispose() { observer.disconnect(); renderer.setAnimationLoop(null); mixer.stopAllAction(); mixer.uncacheRoot(gltf.scene); disposeModel(); renderer.dispose(); renderer.domElement.remove(); }};
}
