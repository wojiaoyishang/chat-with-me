import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Loader2, CheckCircle, XCircle} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';
import {toast} from "sonner";
import apiClient from '@/lib/apiClient.js';
import {apiEndpoint} from '@/config.js';

const Login = () => {
    const {t} = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // 使用 apiClient 发送 POST 请求，跳过 401 的自动重定向处理
            await apiClient.post(apiEndpoint.LOGIN_ENDPOINT, {username, password}, {
                skipAuthCheck: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            // 如果登录成功，重置加载状态并设置成功状态
            setIsLoading(false);
            setIsSuccess(true);
            // 读取 URL 参数中的 redirect，如果没有则默认为 '/'
            const urlParams = new URLSearchParams(window.location.search);
            const redirectUrl = urlParams.get('redirect') || '/';
            // 延迟 1 秒后跳转，以展示成功图标
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 1000);
        } catch (error) {
            toast.error(t('login_error', {message: error.message}));
            // 设置错误状态并重置加载状态
            setIsLoading(false);
            setIsError(true);
            // 3 秒后重置回表单状态
            setTimeout(() => {
                setIsError(false);
            }, 3000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <motion.div
                initial={{opacity: 0, y: 50}} // 初始状态：透明，从下方50px位置
                animate={{opacity: 1, y: 0}} // 动画到：不透明，正常位置
                transition={{duration: 0.6, ease: 'easeOut'}} // 过渡：0.6秒，自然缓出
                className="w-full max-w-md"
            >
                <Card className="shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">{t('login')}</CardTitle>
                        <CardDescription>{t('enter_credentials')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <AnimatePresence mode="wait">
                                {!isLoading && !isSuccess && !isError ? (
                                    <motion.div
                                        key="form"
                                        initial={{opacity: 0, scale: 0.95}} // 初始：略微缩小并透明
                                        animate={{opacity: 1, scale: 1}} // 动画到：正常大小不透明
                                        exit={{opacity: 0, scale: 0.95}} // 退出：缩小并淡出
                                        transition={{duration: 0.3, ease: 'easeInOut'}} // 平滑过渡
                                        className="space-y-4"
                                    >
                                        <div className="space-y-2">
                                            <Label htmlFor="username">{t('username')}</Label>
                                            <Input
                                                id="username"
                                                type="text"
                                                placeholder={t('enter_username')}
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password">{t('password')}</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder={t('enter_password')}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </motion.div>
                                ) : isLoading ? (
                                    <motion.div
                                        key="loading"
                                        initial={{opacity: 0}} // 初始透明
                                        animate={{opacity: 1}} // 淡入
                                        exit={{opacity: 0}} // 淡出
                                        transition={{duration: 0.3, ease: 'easeInOut'}}
                                        className="flex flex-col justify-center items-center h-32 space-y-2" // 调整高度以匹配表单，并垂直居中
                                    >
                                        <Loader2
                                            className="h-8 w-8 animate-spin text-primary"/> {/* 增大图标，添加颜色 */}
                                        <p className="text-primary font-medium">{t('logging_in')}</p>
                                    </motion.div>
                                ) : isSuccess ? (
                                    <motion.div
                                        key="success"
                                        initial={{opacity: 0, scale: 0.8}} // 初始：缩小并透明
                                        animate={{opacity: 1, scale: 1}} // 弹入效果
                                        transition={{duration: 0.5, ease: 'easeOut'}}
                                        className="flex justify-center items-center h-32" // 调整为单图标居中
                                    >
                                        <CheckCircle className="h-10 w-10 text-green-500"/> {/* 只显示绿色打钩图标 */}
                                    </motion.div>
                                ) : isError ? (
                                    <motion.div
                                        key="error"
                                        initial={{opacity: 0, scale: 0.8}} // 初始：缩小并透明
                                        animate={{opacity: 1, scale: 1}} // 弹入效果
                                        transition={{duration: 0.5, ease: 'easeOut'}}
                                        className="flex justify-center items-center h-32" // 调整为单图标居中
                                    >
                                        <XCircle className="h-10 w-10 text-red-500"/> {/* 只显示红色错误图标 */}
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>
                            {/* 只有在表单显示时才显示按钮，加载/成功/错误时按钮消失 */}
                            {!isLoading && !isSuccess && !isError && (
                                <Button
                                    type="submit"
                                    className="cursor-pointer w-full transition-all duration-300 ease-in-out" // 添加按钮过渡
                                >
                                    {t('login_button')}
                                </Button>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default Login;