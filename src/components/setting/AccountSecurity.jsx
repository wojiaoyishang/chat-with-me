import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CryptoJS from 'crypto-js';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useUserStore } from '@/context/userContext.jsx';
import apiClient from '@/lib/apiClient.js';
import { apiEndpoint } from '@/config.js';

export default function AccountSecurity() {
    const { t } = useTranslation();
    const { user, clearUser } = useUserStore();
    const [open, setOpen] = useState(false);
    const [confirmLogout, setConfirmLogout] = useState(false);
    const [busy, setBusy] = useState(false);
    const [passwords, setPasswords] = useState({ current: '', next: '', repeat: '' });
    const closePassword = (value) => {
        if (busy) return;
        setOpen(value);
        setPasswords({ current: '', next: '', repeat: '' });
    };
    const signedOut = (message) => {
        clearUser();
        toast.success(t(message));
        window.location.replace('/login');
    };
    const changePassword = async (event) => {
        event.preventDefault();
        if (busy) return;
        if (passwords.next.length < 8 || passwords.next.length > 128) {
            toast.error(t('accountSecurity.length'));
            return;
        }
        if (passwords.next !== passwords.repeat) {
            toast.error(t('accountSecurity.mismatch'));
            return;
        }
        if (passwords.current === passwords.next) {
            toast.error(t('accountSecurity.different'));
            return;
        }
        setBusy(true);
        try {
            await apiClient.post(apiEndpoint.USER_PASSWORD_ENDPOINT, {
                currentPasswordDigest: CryptoJS.SHA256(passwords.current).toString(),
                newPassword: passwords.next,
            });
            signedOut('accountSecurity.changed');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setBusy(false);
        }
    };
    const logoutAll = async () => {
        if (busy) return;
        setBusy(true);
        try {
            await apiClient.post(apiEndpoint.USER_REVOKE_SESSIONS_ENDPOINT);
            signedOut('accountSecurity.signedOut');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setBusy(false);
        }
    };
    return (
        <section className="rounded-2xl border bg-background p-5 space-y-4">
            <h3 className="text-base font-semibold">{t('accountSecurity.title')}</h3>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                <dt className="text-muted-foreground">{t('accountSecurity.username')}</dt>
                <dd className="break-all">{user?.username}</dd>
                <dt className="text-muted-foreground">{t('accountSecurity.email')}</dt>
                <dd className="break-all">{user?.email}</dd>
            </dl>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => closePassword(true)} disabled={busy}>
                    {t('accountSecurity.change')}
                </Button>
                <Button variant="outline" onClick={() => setConfirmLogout(true)} disabled={busy}>
                    {t('accountSecurity.logoutAll')}
                </Button>
            </div>
            <p className="text-xs text-muted-foreground">{t('accountSecurity.recovery')}</p>
            <Dialog open={open} onOpenChange={closePassword}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('accountSecurity.change')}</DialogTitle>
                        <DialogDescription>{t('accountSecurity.description')}</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={changePassword} className="space-y-4">
                        {['current', 'next', 'repeat'].map((field) => (
                            <div key={field} className="space-y-2">
                                <Label htmlFor={`account-password-${field}`}>{t(`accountSecurity.${field}`)}</Label>
                                <Input
                                    id={`account-password-${field}`}
                                    type="password"
                                    required
                                    disabled={busy}
                                    maxLength={field === 'current' ? 500 : 128}
                                    minLength={field === 'current' ? 1 : 8}
                                    autoComplete={field === 'current' ? 'current-password' : 'new-password'}
                                    value={passwords[field]}
                                    onChange={(event) =>
                                        setPasswords((values) => ({ ...values, [field]: event.target.value }))
                                    }
                                />
                            </div>
                        ))}
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="ghost" disabled={busy} onClick={() => closePassword(false)}>
                                {t('Cancel')}
                            </Button>
                            <Button type="submit" disabled={busy}>
                                {t(busy ? 'accountSecurity.saving' : 'accountSecurity.save')}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            <AlertDialog open={confirmLogout} onOpenChange={setConfirmLogout}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('accountSecurity.logoutAll')}</AlertDialogTitle>
                        <AlertDialogDescription>{t('accountSecurity.logoutDescription')}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={busy}>{t('Cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={logoutAll} disabled={busy}>
                            {t('accountSecurity.confirm')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
}
