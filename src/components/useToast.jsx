// src/hooks/useAppToast.js
import { useToast } from "@chakra-ui/react";

export const useAppToast = () => {
    const toast = useToast();

    const showToast = ({
        title = "",
        description = "",
        status = "success",
        duration = 2000,
    }) => {
        toast({
            title,
            description,
            status,
            duration,
            isClobable: true
        });
    };

    return showToast;
};
