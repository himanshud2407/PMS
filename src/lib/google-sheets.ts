export async function submitToGoogleSheets(data: any, sheetName: string) {
  const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

  if (!scriptUrl) {
    console.error("Google Sheet URL not found in environment variables.");
    return { success: false, error: "Configuration missing" };
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        ...data,
        sheetName,
        timestamp: new Date().toLocaleString()
      }),
    });

    const result = await response.json();
    return { success: result.result === "success" };
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return { success: false, error };
  }
}
