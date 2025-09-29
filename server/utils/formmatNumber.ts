export const formatPhoneNumber = (phone: string): string => {
    try {
        // Remove spaces and non-digits
        let normalized = phone.replace(/\D/g, "");

        // If it starts with '0', replace with '254'
        if (normalized.startsWith("0")) {
            normalized = "254" + normalized.slice(1);
        }

        // If it starts with '+', remove it
        if (normalized.startsWith("254") === false) {
            throw new Error("Invalid phone number format");
        }

        if(normalized.length !== 12){
            throw new Error("Invalid phone number format");
        }

        return normalized;      
    } catch (error) {
        throw new Error((error as Error).message)
    }
  
};
