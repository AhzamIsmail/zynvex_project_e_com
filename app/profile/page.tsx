"use client";

import React, { useState, useId } from "react";
import PageContainer from "@/components/layout/page-container";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Badge from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Save,
  RotateCcw,
  Sparkles,
  Camera,
  Bell,
  KeyRound,
} from "lucide-react";

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  bio: string;
  emailAlerts: boolean;
  smsAlerts: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  bio?: string;
}

interface TouchedFields {
  fullName?: boolean;
  email?: boolean;
  phone?: boolean;
  bio?: boolean;
}

const INITIAL_PROFILE: ProfileFormData = {
  fullName: "Alex Mercer",
  email: "alex.mercer@zynvex.io",
  phone: "+1 (555) 234-5678",
  role: "Store Operations Lead",
  bio: "Managing digital catalog inventory, order fulfillment, and conversion metrics across Kartify storefront.",
  emailAlerts: true,
  smsAlerts: false,
};

export default function ProfilePage() {
  const { showToast } = useCart();
  const bioId = useId();

  const [formData, setFormData] = useState<ProfileFormData>(INITIAL_PROFILE);
  const [savedData, setSavedData] = useState<ProfileFormData>(INITIAL_PROFILE);
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSuccessBannerVisible, setIsSuccessBannerVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "security" | "notifications">("general");

  // Real-time validation logic
  const validate = (data: ProfileFormData): FormErrors => {
    const errors: FormErrors = {};

    // Full name validation
    if (!data.fullName.trim()) {
      errors.fullName = "Full name is required.";
    } else if (data.fullName.trim().length < 3) {
      errors.fullName = "Full name must be at least 3 characters.";
    } else if (!/^[a-zA-Z\s\-'.]+$/.test(data.fullName.trim())) {
      errors.fullName = "Full name can only contain letters, spaces, hyphens, and apostrophes.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!data.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(data.email.trim())) {
      errors.email = "Please enter a valid email address (e.g. name@example.com).";
    }

    // Phone validation
    const phoneRegex = /^\+?[0-9\s\-().]{7,18}$/;
    if (!data.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(data.phone.trim())) {
      errors.phone = "Please enter a valid phone number (min 7 digits).";
    }

    // Bio length validation
    if (data.bio.length > 300) {
      errors.bio = "Bio cannot exceed 300 characters.";
    }

    return errors;
  };

  const errors = validate(formData);
  const isFormValid = Object.keys(errors).length === 0;

  // Check if modified (dirty)
  const isDirty =
    formData.fullName !== savedData.fullName ||
    formData.email !== savedData.email ||
    formData.phone !== savedData.phone ||
    formData.role !== savedData.role ||
    formData.bio !== savedData.bio ||
    formData.emailAlerts !== savedData.emailAlerts ||
    formData.smsAlerts !== savedData.smsAlerts;

  const handleFieldChange = (field: keyof ProfileFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    setIsSuccessBannerVisible(false);
  };

  const handleBlur = (field: keyof TouchedFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      bio: true,
    });

    if (!isFormValid) {
      showToast("Please correct the errors in the form before saving.", "warning");
      return;
    }

    setSavedData(formData);
    setIsSuccessBannerVisible(true);
    showToast("Profile information updated successfully!", "success");
  };

  const handleReset = () => {
    setFormData(savedData);
    setTouched({});
    setIsSuccessBannerVisible(false);
    showToast("Form reset to last saved state.", "info");
  };

  return (
    <PageContainer className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-2">
          <Sparkles className="h-3 w-3" />
          Account & Preferences
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          User Profile & Settings
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage your personal details, verified contact information, and security preferences.
        </p>
      </div>

      {/* Success Banner */}
      {isSuccessBannerVisible && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-emerald-900">
              Profile Changes Successfully Saved!
            </h4>
            <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
              Your profile has been updated. Live information: <strong>{savedData.fullName}</strong> ({savedData.email}) • {savedData.role}.
            </p>
          </div>
          <button
            onClick={() => setIsSuccessBannerVisible(false)}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 p-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Profile Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Profile Card & Quick Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center flex flex-col items-center">
            {/* Avatar with status */}
            <div className="relative mb-4">
              <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-brand-600 to-purple-400 flex items-center justify-center text-white text-3xl font-extrabold shadow-md">
                {savedData.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 p-2 bg-white border border-slate-200 rounded-full shadow-sm text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition-colors"
                title="Change Avatar"
                onClick={() => showToast("Avatar upload feature simulated.", "info")}
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>

            <h2 className="text-lg font-bold text-slate-900">{savedData.fullName}</h2>
            <p className="text-xs text-slate-500">{savedData.email}</p>

            <div className="mt-3 flex items-center gap-2">
              <Badge variant="info">{savedData.role}</Badge>
              <Badge variant="success">Verified User</Badge>
            </div>

            <p className="mt-4 text-xs text-slate-600 italic bg-slate-50 p-3 rounded-xl border border-slate-100 text-left w-full leading-relaxed">
              &ldquo;{savedData.bio}&rdquo;
            </p>

            <div className="mt-6 w-full pt-4 border-t border-slate-100 flex flex-col gap-2 text-xs text-slate-600 text-left">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                <span>{savedData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Two-Factor Authentication Active</span>
              </div>
            </div>
          </div>

          {/* Navigation Sub-tabs */}
          <div className="bg-white border border-slate-200 rounded-xl p-2 shadow-sm space-y-1">
            <button
              onClick={() => setActiveTab("general")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === "general"
                  ? "bg-brand-50 text-brand-700 font-bold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <User className="h-4 w-4" />
              <span>Personal Information</span>
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === "security"
                  ? "bg-brand-50 text-brand-700 font-bold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <KeyRound className="h-4 w-4" />
              <span>Security & Passwords</span>
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === "notifications"
                  ? "bg-brand-50 text-brand-700 font-bold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Bell className="h-4 w-4" />
              <span>Notification Preferences</span>
            </button>
          </div>
        </div>

        {/* Right Column: Form with Real-Time Validation */}
        <div className="lg:col-span-8">
          <Card
            title={
              activeTab === "general"
                ? "Edit Personal Details"
                : activeTab === "security"
                ? "Security Framework"
                : "Notification Settings"
            }
            description={
              activeTab === "general"
                ? "All inputs feature real-time validation with instant feedback."
                : activeTab === "security"
                ? "Configure authentication tokens and access credentials."
                : "Choose how Kartify sends you order dispatch and system updates."
            }
          >
            {activeTab === "general" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-slate-400" />
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      {touched.fullName && !errors.fullName && (
                        <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Valid
                        </span>
                      )}
                    </div>
                    <Input
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={(e) => handleFieldChange("fullName", e.target.value)}
                      onBlur={() => handleBlur("fullName")}
                      error={touched.fullName ? errors.fullName : undefined}
                      className={
                        touched.fullName && !errors.fullName
                          ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                          : ""
                      }
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      {touched.email && !errors.email && (
                        <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Valid
                        </span>
                      )}
                    </div>
                    <Input
                      type="email"
                      placeholder="e.g. user@domain.com"
                      value={formData.email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      error={touched.email ? errors.email : undefined}
                      className={
                        touched.email && !errors.email
                          ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                          : ""
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone Number */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      {touched.phone && !errors.phone && (
                        <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Valid
                        </span>
                      )}
                    </div>
                    <Input
                      placeholder="e.g. +1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => handleFieldChange("phone", e.target.value)}
                      onBlur={() => handleBlur("phone")}
                      error={touched.phone ? errors.phone : undefined}
                      className={
                        touched.phone && !errors.phone
                          ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                          : ""
                      }
                    />
                  </div>

                  {/* Role / Job Title */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                      Role / Department
                    </label>
                    <Input
                      placeholder="e.g. Operations Specialist"
                      value={formData.role}
                      onChange={(e) => handleFieldChange("role", e.target.value)}
                    />
                  </div>
                </div>

                {/* Bio / Description */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor={bioId} className="text-xs font-bold text-slate-700">
                      Professional Bio
                    </label>
                    <span className={`text-[10px] ${formData.bio.length > 300 ? "text-rose-600 font-bold" : "text-slate-400"}`}>
                      {formData.bio.length} / 300 characters
                    </span>
                  </div>
                  <textarea
                    id={bioId}
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => handleFieldChange("bio", e.target.value)}
                    onBlur={() => handleBlur("bio")}
                    placeholder="Brief description about your role or store preferences..."
                    className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 ${
                      touched.bio && errors.bio
                        ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                        : "border-slate-200 focus:border-brand-500 focus:ring-brand-500/20"
                    }`}
                  />
                  {touched.bio && errors.bio && (
                    <span className="text-[10px] font-medium text-rose-600">
                      {errors.bio}
                    </span>
                  )}
                </div>

                {/* Form Action Controls */}
                <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    {!isDirty ? (
                      <span className="text-slate-400">All fields up to date.</span>
                    ) : isFormValid ? (
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Ready to save changes.
                      </span>
                    ) : (
                      <span className="text-rose-600 font-semibold flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" /> Please resolve highlighted validation errors.
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {isDirty && (
                      <Button
                        type="button"
                        variant="outline"
                        size="md"
                        onClick={handleReset}
                        className="gap-1.5 text-xs text-slate-600"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Discard Changes</span>
                      </Button>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={!isFormValid || !isDirty}
                      className="gap-2 text-xs font-semibold shadow-sm w-full sm:w-auto"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Profile Changes</span>
                    </Button>
                  </div>
                </div>
              </form>
            )}

            {activeTab === "security" && (
              <div className="space-y-5">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Password & Session Management
                  </h4>
                  <p className="text-xs text-slate-500">
                    Your password was last changed 42 days ago. Security score: <strong>Strong (94/100)</strong>.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => showToast("Password reset email sent to " + savedData.email, "info")}
                  >
                    Request Password Reset
                  </Button>
                </div>

                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-emerald-900">Two-Factor Authentication</h5>
                    <p className="text-[11px] text-emerald-700">Secured via Authenticator App (TOTP)</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 border border-slate-200 rounded-xl">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Email Order Confirmations</h5>
                    <p className="text-[11px] text-slate-500">Receive transactional emails and shipping receipts</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.emailAlerts}
                    onChange={(e) => handleFieldChange("emailAlerts", e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 border border-slate-200 rounded-xl">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">SMS Dispatch Notifications</h5>
                    <p className="text-[11px] text-slate-500">Instant SMS tracking updates to {formData.phone}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.smsAlerts}
                    onChange={(e) => handleFieldChange("smsAlerts", e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
