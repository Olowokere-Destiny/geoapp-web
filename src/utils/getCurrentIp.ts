export const getCurrentIp = async () => {
    const response = await fetch("https://ipinfo.io//geo");
    const data = await response.json();
    return data;
};