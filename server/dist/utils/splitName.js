// Utility function
export default function splitName(fullName) {
    const parts = fullName.trim().split(/\s+/);
    return {
        firstName: parts[0] || "",
        lastName: parts.slice(1).join(" ") || "",
    };
}
//# sourceMappingURL=splitName.js.map