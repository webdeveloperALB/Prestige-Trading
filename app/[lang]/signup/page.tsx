"use client";

import type React from "react";
import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { translations, type Locale } from "@/lib/translations";

interface SignUpProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default function SignUp({ params }: SignUpProps) {
  const { lang } = use(params);
  const t = translations[lang];

  const [showPassword, setShowPassword] = useState(false);

  // Include referralNode in state so it can be saved
  const [formData, setFormData] = useState({
    referralNode: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // This is the single code everyone must type
  const UNIVERSAL_REFERRAL = "TRADEPRO2025";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 1) Validate referral code
    if (formData.referralNode.trim() !== UNIVERSAL_REFERRAL) {
      toast({
        title: t.signup.messages.genericError,
        description: t.signup.messages.invalidReferralCode,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // 2) Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: t.signup.messages.genericError,
        description: t.signup.messages.passwordMismatch,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // 3) Send all six fields to /api/signup
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referralNode: formData.referralNode.trim(),
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      if (res.ok) {
        toast({
          title: t.signup.messages.success,
          description: t.signup.messages.accountSaved,
        });
        setFormData({
          referralNode: "",
          fullName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        const { error } = await res.json();
        toast({
          title: t.signup.messages.genericError,
          description: error || t.signup.messages.genericError,
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: t.signup.messages.genericError,
        description: t.signup.messages.networkError,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen pt-36 pb-16 flex items-center justify-center px-4 bg-gradient-to-r from-[#000a12] to-[#02141f]">
      <div className="w-full max-w-md bg-[#031930] backdrop-blur-lg rounded-xl">
        <Card className="bg-[#031930]/80 backdrop-blur-md rounded-xl shadow-lg border-none border-transparent">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">
              {t.signup.title}
            </CardTitle>
            <CardDescription className="text-white">
              {t.signup.subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Referral Code */}
              <div className="space-y-2">
                <Label htmlFor="referralNode" className="text-white">
                  {t.signup.form.referralCode}
                </Label>
                <Input
                  id="referralNode"
                  name="referralNode"
                  type="text"
                  placeholder={t.signup.form.referralCodePlaceholder}
                  value={formData.referralNode}
                  onChange={handleInputChange}
                  className="border-none bg-slate-800/50 text-white placeholder-gray-400"
                  required
                />
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-300">
                  {t.signup.form.fullName}
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder={t.signup.form.fullNamePlaceholder}
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="border-none bg-slate-800/50 text-white placeholder-gray-400"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  {t.signup.form.email}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t.signup.form.emailPlaceholder}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-none bg-slate-800/50 text-white placeholder-gray-400"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">
                  {t.signup.form.phone}
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={t.signup.form.phonePlaceholder}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border-none bg-slate-800/50 text-white placeholder-gray-400"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  {t.signup.form.password}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t.signup.form.passwordPlaceholder}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="border-none bg-slate-800/50 text-white placeholder-gray-400 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  {t.signup.form.confirmPassword}
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder={t.signup.form.confirmPasswordPlaceholder}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="border-none bg-slate-800/50 text-white placeholder-gray-400"
                  required
                />
              </div>

              {/* Security Features */}
              <div className="flex items-center space-x-2 text-sm text-green-400">
                <Shield className="w-4 h-4" />
                <span>{t.signup.security.sslEncrypted}</span>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#0a4235] hover:bg-[#0a4235]"
                disabled={isLoading}
              >
                {isLoading
                  ? t.signup.form.submitting
                  : t.signup.form.submitButton}
              </Button>
            </form>

            {/* Trust Indicators */}
            <div className="mt-6 pt-6 border-t border-purple-500/20">
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>{t.signup.security.verifiedPlatform}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3 text-blue-400" />
                  <span>{t.signup.security.bankLevelSecurity}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
