import {onEvent} from "@/context/useEventStore.jsx";
import {useEffect} from "react";
import {toast} from "sonner";

// 全局页面事件
const ContextEvent = () => {
    useEffect(() => {

        const unsubscribe1 = onEvent({
            event: 'context.toast.show',
        }).then(({payload}) => {
            if (!Array.isArray(payload.args)) payload.args = [payload.args];
            toast[payload.name]?.(...payload.args);
        });

        return () => {
            unsubscribe1();
        };

    }, []);
}

export default ContextEvent;