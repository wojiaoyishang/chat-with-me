import {motion, AnimatePresence} from 'framer-motion';
import {Loader2} from 'lucide-react';

/**
 * 按钮内部内容包装器
 * @param {boolean} isLoading - 是否处于加载状态
 * @param {React.ReactNode} children - 正常显示的文字/内容
 * @param {React.ElementType} icon - 正常显示的图标组件 (Lucide Icon)
 */
export const ButtonContentWrapper = ({isLoading, children, icon: Icon}) => {
    return (
        <div className="relative flex items-center justify-center gap-2 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
                {isLoading ? (
                    <motion.div
                        key="loading"
                        initial={{opacity: 0, y: 15}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -15}}
                        transition={{duration: 0.15}}
                        className="flex items-center gap-2"
                    >
                        <Loader2 className="w-4 h-4 animate-spin"/>
                        {/* 如果加载时也想显示文字，可以保留 children，或者只显示加载中 */}
                        <span>{children}</span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="normal"
                        initial={{opacity: 0, y: 15}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -15}}
                        transition={{duration: 0.15}}
                        className="flex items-center gap-2"
                    >
                        {Icon && <Icon className="w-4 h-4"/>}
                        <span>{children}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};