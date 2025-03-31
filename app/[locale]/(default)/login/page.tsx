'use client';

import { useState } from "react";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login() {
    const t = useTranslations('auth');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>('credentials');

    const handleLogin = async (provider: string) => {
        setIsLoading(true);
        try {
            if (provider === 'credentials') {
                const result = await signIn('credentials', {
                    username,
                    password,
                    redirect: false,
                });
                if (result?.error) {
                    console.error('Login error:', result.error);
                    // TODO: 显示错误消息
                } else if (result?.ok) {
                    window.location.href = '/';
                }
            } else if (provider === 'email') {
                // TODO: 实现邮箱验证码登录
                console.log('Email login:', email, verificationCode);
            } else if (provider === 'phone') {
                // TODO: 实现手机验证码登录
                console.log('Phone login:', phone, verificationCode);
            } else {
                await signIn(provider, { callbackUrl: '/' });
            }
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-muted/50">
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
                                        disabled={isLoading || !email}
                                        onClick={() => {/* TODO: 发送验证码 */}}
                                    >
                                        {t('send_code')}
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
                                        disabled={isLoading || !phone}
                                        onClick={() => {/* TODO: 发送验证码 */}}
                                    >
                                        {t('send_code')}
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
