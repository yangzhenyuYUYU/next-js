'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { PaymentDialog } from './payment-dialog';
import { useTranslations } from "next-intl";

export function PricingCards() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 这里简化处理，实际项目中应该从 auth 状态获取
  
  // Use the useTranslations hook to get the t function for the "pricing" namespace
  const t = useTranslations("pricing");

  // Define tiers using translations
  const tiers = [
    {
      name: t("standard.name"),
      id: 'standard',
      price: t("standard.price"),
      description: t("standard.description"),
      features: t.raw("standard.features") as string[],
    },
    {
      name: t("pro.name"),
      id: 'pro',
      price: t("pro.price"),
      description: t("pro.description"),
      features: t.raw("pro.features") as string[],
    },
    {
      name: t("enterprise.name"),
      id: 'enterprise',
      price: t("enterprise.price"),
      description: t("enterprise.description"),
      features: t.raw("enterprise.features") as string[],
    },
  ];

  const handlePurchase = (tierId: string) => {
    if (!isLoggedIn) {
      // 如果未登录，显示登录按钮
      return;
    }
    setSelectedTier(tierId);
    setShowPaymentDialog(true);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {tiers.map((tier) => (
        <Card key={tier.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{tier.name}</CardTitle>
            <CardDescription>{tier.description}</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">{tier.price}</span>
              <span className="text-muted-foreground">{t("per_month")}</span>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
              <Button
                className="w-full rounded-full text-lg py-6"
                onClick={() => handlePurchase(tier.id)}
              >
                {t("buy_now")}
              </Button>
          </CardFooter>
        </Card>
      ))}
      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        tier={selectedTier}
      />
    </div>
  );
}