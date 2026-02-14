import {onEvent} from "@/context/useEventStore.jsx";
import {useEffect} from "react";
import {toast} from "sonner";

// 全局页面事件
const ContextEvent = () => {
    useEffect(() => {

        const unsubscribe1 = onEvent({
            type: "widget",
            target: "Context",
        }).then(({payload}) => {
            switch (payload.command) {
                case "Show-Toast":  // 展示吐司
                    if (!Array.isArray(payload.args)) payload.args = [payload.args];
                    toast[payload.name]?.(...payload.args);
                    break;
            }
        });

        return () => {
            unsubscribe1();
        };

    }, []);
}

export default ContextEvent;