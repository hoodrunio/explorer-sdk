/** Downloads swagger file at given URL. And returns the response bpdy. */
export const fetchSwaggerFile = async (fileUrl: string): Promise<string> => {
    try {
        const res = await fetch(fileUrl)
        return res.text()
    } catch (error) {
        throw (`URL cannot be fetched ${fileUrl}.\n${error}`)
    }
}