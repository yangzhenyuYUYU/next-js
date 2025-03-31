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
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export function LoginButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const t = useTranslations("auth");
  
  const handleLogin = async (provider: string) => {
    
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl: '/' });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
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
        </div>
      </DialogContent>
    </Dialog>
  );
} 