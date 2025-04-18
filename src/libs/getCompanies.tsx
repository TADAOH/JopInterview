export default async function getCompanies() {

    await new Promise((resolve) => {
        setTimeout(resolve, 300);
    })

    const response = await fetch("https://jobfair-project-rvik.vercel.app/api/v1/companies",{
        cache:"no-cache"
    });

    if (!response.ok)
        throw new Error("Failed to fetch data!");

    return await response.json();


}