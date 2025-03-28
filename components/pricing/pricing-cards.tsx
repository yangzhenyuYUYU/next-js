'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { PaymentDialog } from './payment-dialog';

const tiers = [
  {
    name: '标准版',
    id: 'standard',
    price: '¥99',
    description: '适合个人开发者和小型项目',
    features: [
      '基础功能支持',
      '每月 1000 次调用',
      '邮件支持',
      '基础文档访问',
    ],
  },
  {
    name: '专业版',
    id: 'pro',
    price: '¥299',
    description: '适合中小型企业和团队',
    features: [
      '所有标准版功能',
      '每月 10000 次调用',
      '优先邮件支持',
      '高级文档访问',
      'API 访问',
      '团队协作',
    ],
  },
  {
    name: '企业版',
    id: 'enterprise',
    price: '¥999',
    description: '适合大型企业和组织',
    features: [
      '所有专业版功能',
      '无限次调用',
      '24/7 技术支持',
      '专属客户经理',
      '自定义功能开发',
      'SLA 保障',
    ],
  },
];

export function PricingCards() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 这里简化处理，实际项目中应该从 auth 状态获取

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
              <span className="text-muted-foreground">/月</span>
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
                立即购买
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