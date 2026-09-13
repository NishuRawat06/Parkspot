"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { ProfileCard } from "@/components/settings/ProfileCard";
import { PasswordCard } from "@/components/settings/PasswordCard";
import { ThemeCard } from "@/components/settings/ThemeCard";
import { SessionCard } from "@/components/settings/SessionCard";
import { useSettings } from "@/hooks/useSettings";

const Page = () => {
  const s = useSettings();

  return (
    <main className="min-h-screen w-full bg-background p-4 md:p-6">
      <PageHeader
        eyebrow="Parking Management / Settings"
        title="Settings"
        subtitle="Manage your account and preferences"
      />

      <div className="mt-5 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ProfileCard
          userName={s.userName}
          email={s.email}
          loading={s.loading}
          saving={s.savingProfile}
          onNameChange={s.setUserName}
          onSubmit={s.updateProfile}
        />
        <PasswordCard
          currentPassword={s.currentPassword}
          newPassword={s.newPassword}
          showCurrent={s.showCurrentPassword}
          showNew={s.showNewPassword}
          changing={s.changingPassword}
          onCurrentChange={s.setCurrentPassword}
          onNewChange={s.setNewPassword}
          onToggleCurrent={() => s.setShowCurrentPassword((v) => !v)}
          onToggleNew={() => s.setShowNewPassword((v) => !v)}
          onSubmit={s.changePassword}
        />
        <ThemeCard theme={s.theme} onToggle={s.toggleTheme} />
        <SessionCard onLogout={s.logout} />
      </div>
    </main>
  );
};

export default Page;
