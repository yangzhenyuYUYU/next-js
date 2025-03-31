'use client';

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();
    const t = useTranslations('auth');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>('credentials');
    const [countdown, setCountdown] = useState<number>(0);
    const [currentCode, setCurrentCode] = useState<string>('');
    const [showCodeMessage, setShowCodeMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        // 如果用户已登录，重定向到首页
        if (status === 'authenticated') {
            router.push('/');
        }
    }, [status, router]);

    useEffect(() => {
        // 处理倒计时
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleLogin = async (provider: string) => {
        setIsLoading(true);
        setErrorMessage(''); // 清除之前的错误信息
        try {
            if (provider === 'credentials') {
                const result = await signIn('credentials', {
                    username,
                    password,
                    redirect: false,
                });
                if (result?.error) {
                    setErrorMessage(t('errors.username_password_error'));
                } else if (result?.ok) {
                    const from = searchParams.get('from') || '/';
                    router.push(from);
                }
            } else if (provider === 'email' || provider === 'phone') {
                // 验证码验证
                if (!currentCode) {
                    setErrorMessage(t('errors.get_code_first'));
                    return;
                }
                if (verificationCode === currentCode) {
                    // 验证成功，模拟登录
                    await signIn('credentials', {
                        username: provider === 'email' ? email : phone,
                        password: verificationCode,
                        loginType: 'code',
                        redirect: false,
                    });
                    const from = searchParams.get('from') || '/';
                    router.push(from);
                } else {
                    setErrorMessage(t('errors.wrong_code'));
                }
            } else {
                const from = searchParams.get('from') || '/';
                await signIn(provider, { callbackUrl: from });
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage(t('errors.login_failed'));
        } finally {
            setIsLoading(false);
        }
    };

    const sendVerificationCode = async (type: 'email' | 'phone') => {
        try {
            setIsLoading(true);
            setErrorMessage(''); // 清除之前的错误信息
            const target = type === 'email' ? email : phone;
            
            if (!target) {
                setErrorMessage(t(`errors.${type === 'email' ? 'invalid_email' : 'invalid_phone'}`));
                return;
            }

            // 调用发送验证码接口
            const response = await fetch('/api/auth/send-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type,
                    target,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || t('errors.send_failed'));
            }

            // 在开发环境下，显示验证码
            if (process.env.NODE_ENV === 'development' && data.code) {
                setCurrentCode(data.code);
                setShowCodeMessage(true);
                // 5秒后隐藏提示
                setTimeout(() => setShowCodeMessage(false), 5000);
            } else {
                // 生产环境下显示发送成功提示
                setErrorMessage(t('success.code_sent', { target }));
                setTimeout(() => setErrorMessage(''), 3000);
            }

            // 开始60秒倒计时
            setCountdown(60);
        } catch (error) {
            console.error('Error sending verification code:', error);
            setErrorMessage(error instanceof Error ? error.message : t('errors.send_failed'));
        } finally {
            setIsLoading(false);
        }
    };

    // 如果正在检查登录状态，显示加载状态
    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    // 如果用户未登录，显示登录页面
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-muted/50">
            {showCodeMessage && currentCode && (
                <div className="fixed top-4 right-4 z-50 bg-white border border-green-500 text-green-700 px-6 py-4 rounded-lg shadow-xl">
                    <div className="flex flex-col">
                        <p className="font-medium text-green-800">{t('success.code_title')}</p>
                        <p className="text-3xl font-bold tracking-[0.5em] mt-2">{currentCode}</p>
                        <p className="text-sm mt-2 text-green-600">
                            {t('success.resend_countdown', { seconds: countdown })}
                        </p>
                    </div>
                </div>
            )}
            {/* 错误提示 */}
            {errorMessage && (
                <div className="fixed top-4 left-4 z-50 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg animate-in fade-in duration-300">
                    <p>{errorMessage}</p>
                </div>
            )}
            <Card className="w-[420px] shadow-lg">
                <CardHeader className="space-y-1 pb-6">
                    <CardTitle className="text-2xl text-center">{t('login')}</CardTitle>
                    <CardDescription className="text-center">{t('choose_method')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="flex w-full rounded-lg bg-muted p-1 mb-6">
                            <TabsTrigger 
                                value="credentials" 
                                className="flex-1 px-3 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md"
                            >
                                {t('username_password')}
                            </TabsTrigger>
                            <TabsTrigger 
                                value="email"
                                className="flex-1 px-3 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md"
                            >
                                {t('email')}
                            </TabsTrigger>
                            <TabsTrigger 
                                value="phone"
                                className="flex-1 px-3 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md"
                            >
                                {t('phone')}
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="credentials" className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">{t('username')}</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={isLoading}
                                    placeholder={t('username_placeholder')}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">{t('password')}</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                    placeholder={t('password_placeholder')}
                                />
                            </div>
                            <Button
                                className="w-full"
                                onClick={() => handleLogin('credentials')}
                                disabled={isLoading || !username || !password}
                            >
                                {t('login')}
                            </Button>
                        </TabsContent>
                        <TabsContent value="email" className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">{t('email')}</Label>
                                <div className="flex space-x-2">
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                        placeholder={t('email_placeholder')}
                                    />
                                    <Button
                                        variant="outline"
                                        disabled={isLoading || !email || countdown > 0}
                                        onClick={() => sendVerificationCode('email')}
                                        className="w-[120px]"
                                    >
                                        {countdown > 0 ? `${countdown}s` : t('send_code')}
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="emailCode">{t('verification_code')}</Label>
                                <Input
                                    id="emailCode"
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    disabled={isLoading}
                                    placeholder={t('code_placeholder')}
                                />
                            </div>
                            <Button
                                className="w-full"
                                onClick={() => handleLogin('email')}
                                disabled={isLoading || !email || !verificationCode}
                            >
                                {t('login')}
                            </Button>
                        </TabsContent>
                        <TabsContent value="phone" className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">{t('phone')}</Label>
                                <div className="flex space-x-2">
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        disabled={isLoading}
                                        placeholder={t('phone_placeholder')}
                                    />
                                    <Button
                                        variant="outline"
                                        disabled={isLoading || !phone || countdown > 0}
                                        onClick={() => sendVerificationCode('phone')}
                                        className="w-[120px]"
                                    >
                                        {countdown > 0 ? `${countdown}s` : t('send_code')}
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phoneCode">{t('verification_code')}</Label>
                                <Input
                                    id="phoneCode"
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    disabled={isLoading}
                                    placeholder={t('code_placeholder')}
                                />
                            </div>
                            <Button
                                className="w-full"
                                onClick={() => handleLogin('phone')}
                                disabled={isLoading || !phone || !verificationCode}
                            >
                                {t('login')}
                            </Button>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                {t('or')}
                            </span>
                        </div>
                    </div>
                    <div className="grid gap-2 w-full">
                        <Button
                            variant="outline"
                            onClick={() => handleLogin('google')}
                            disabled={isLoading}
                            className="w-full"
                        >
                            <Icons.google className="mr-2 h-4 w-4" />
                            {t('google')}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleLogin('github')}
                            disabled={isLoading}
                            className="w-full"
                        >
                            <Icons.gitHub className="mr-2 h-4 w-4" />
                            {t('github')}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleLogin('wechat')}
                            disabled={isLoading}
                            className="w-full"
                        >
                            <Icons.wechat className="mr-2 h-4 w-4" />
                            {t('wechat')}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
