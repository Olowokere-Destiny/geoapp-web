export const searchIpAdress = async (ip: string) => {
    const response = await fetch(`https://ipinfo.io/${ip}/geo`);
    const data = await response.json();
    return data;
};