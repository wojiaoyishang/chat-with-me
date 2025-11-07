import {Toaster} from "@/components/ui/sonner";
import {X} from "lucide-react";

const MyToaster = () => {
    return (
        <Toaster richColors position="top-center" toastOptions={
            {
                closeButton: true
            }
        }/>
    )
}

export default MyToaster;