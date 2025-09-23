function extractTownCity(address: string): { town: string; city: string } {
    const parts = address.split(",").map(p => p.trim());

    const city = parts[parts.length - 3] || "";
    const town = parts[parts.length - 4] || "";

    return { town, city };
}

export default extractTownCity;