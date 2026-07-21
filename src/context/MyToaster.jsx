import React from 'react';
import {Toaster} from "@/components/ui/sonner";

const MyToaster = () => {
    return (
        <>
            <Toaster
                richColors
                position="top-center"
                toastOptions={{closeButton: true}}
            />
            <Toaster
                id="notifications-desktop"
                position="bottom-right"
                visibleToasts={5}
                toastOptions={{closeButton: false}}
            />
            <Toaster
                id="notifications-mobile"
                position="top-center"
                visibleToasts={2}
                gap={8}
                mobileOffset={{
                    top: 'calc(env(safe-area-inset-top) + 8px)',
                    left: 8,
                    right: 8,
                }}
                toastOptions={{closeButton: false}}
            />
        </>
    );
};

export default MyToaster;
