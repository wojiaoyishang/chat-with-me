import {useState, useEffect} from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '../../assets/css/index.css'

import {useTranslation, Trans} from 'react-i18next';


function App() {
    const {t} = useTranslation();

    const [count, setCount] = useState(0)

    useEffect(() => {
        // 页面（组件）首次挂载后执行
        console.log('App rendered!')
        // 可以在这里初始化、埋点、调用第三方库等
    }, [])


    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    {t('count is')} {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
