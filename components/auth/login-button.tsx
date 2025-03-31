'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icons } from '@/components/ui/icons';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function LoginButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const t = useTranslations("auth");
  const { data: session } = useSession();
  const [showCredentials, setShowCredentials] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
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
      } else {
        await signIn(provider, { callbackUrl: '/' });
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (session?.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
              <AvatarFallback>{session.user.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{session.user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
            <Icons.logOut className="mr-2 h-4 w-4" />
            {t('logout')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={isLoading}>
          {t('login')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('choose_method')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            onClick={() => handleLogin('google')}
            disabled={isLoading}
          >
            <Icons.google className="mr-2 h-4 w-4" />
            {t('google')}
          </Button>
          <Button
            variant="outline"
            onClick={() => handleLogin('github')}
            disabled={isLoading}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            {t('github')}
          </Button>
          <Button
            variant="outline"
            onClick={() => handleLogin('wechat')}
            disabled={isLoading}
          >
            <Icons.wechat className="mr-2 h-4 w-4" />
            {t('wechat')}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t('or')}
              </span>
            </div>
          </div>
          {!showCredentials ? (
            <>
              <Button
                variant="outline"
                onClick={() => handleLogin('email')}
                disabled={isLoading}
              >
                <Icons.mail className="mr-2 h-4 w-4" />
                {t('email')}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleLogin('phone')}
                disabled={isLoading}
              >
                <Icons.phone className="mr-2 h-4 w-4" />
                {t('phone')}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCredentials(true)}
                disabled={isLoading}
              >
                <Icons.mail className="mr-2 h-4 w-4" />
                {t('username_password')}
              </Button>
            </>
          ) : (
            <div className="space-y-4">
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
              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCredentials(false)}
                  disabled={isLoading}
                >
                  {t('back')}
                </Button>
                <Button
                  onClick={() => handleLogin('credentials')}
                  disabled={isLoading || !username || !password}
                >
                  {t('login')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 