const fs = require("fs");
const path = require("path");
const webhookUrl = 'https://bdmsgroup.webhook.office.com/webhookb2/37c6a24a-aa0e-4d45-adea-fa8400cbf5e4@325c40be-6d2b-4006-b2c5-078947c856d2/IncomingWebhook/51643aae01dc4242948769a5ac358336/d00d6fcd-747f-47b7-9fe1-55a34064c1fe/V2Q0mIuRhdLMJaYoFje039Zy4f7SIa-jgMbafbwv1bBKs1'
const resultsPath = "./allure-results";
const results = parseAllureResults(resultsPath);

function parseAllureResults(resultsPath: string) {
  const files = fs.readdirSync(resultsPath);
  const featureResults = [];
  files.forEach((file: string) => {
    if (file.endsWith(".json")) {
      const data = JSON.parse(
        fs.readFileSync(path.join(resultsPath, file), "utf-8")
      );

      if (data.fullName) {
        const featureName = data.fullName.split(" > ")[0].split(": ")[1];
        let feature = featureResults.find((f) => f.name === featureName);
        if (!feature) {
          feature = { name: featureName, passed: 0, failed: 0, skipped: 0 };
          featureResults.push(feature);
        }
        if (data.status === "passed") feature.passed++;
        if (data.status === "broken") feature.failed++;
        if (data.status === "skipped") feature.skipped++;
      }
    }
  });
  featureResults.forEach((feature) => {
    feature.total = feature.passed + feature.failed + feature.skipped;
  });

  return featureResults;
}

function clearAllureResults(resultsPath: any) {
  try {
    const files = fs.readdirSync(resultsPath);
    files.forEach((file: any) => {
      const filePath = path.join(resultsPath, file);
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error(error);
  }
}

// Send Message To MS Team
async function sendTeamsMessage(webhookUrl: string | URL | Request, failedSuites: any[], title = "Run all the test case") {
  try {
    let totalTests = 0;
    let totalPassing = 0;
    let totalFailing = 0;
    let totalPending = 0;

    const suiteDetails: string[] = [];

    for (const suite of failedSuites) {
      totalTests += suite.failed + suite.passed + suite.skipped;
      totalPassing += suite.passed;
      totalFailing += suite.failed;
      totalPending += suite.skipped;

      suiteDetails.push(
        `${suite.name}`,
        `**Tests:** ${suite.failed + suite.passed + suite.skipped} || **Passing:** ${suite.passed} || **Failing:** ${suite.failed} || **Pending:** ${suite.skipped}`,
        `──────────────────────────`
      );
    }

    const payload = {
      type: "message",
      attachments: [
        {
          contentType: "application/vnd.microsoft.card.adaptive",
          content: {
            type: "AdaptiveCard",
            version: "1.0",
            body: [
              {
                type: "TextBlock",
                text: "*SkinX-Backoffice Test Report*",
                weight: "Bolder",
                size: "Medium"
              },
              {
                type: "TextBlock",
                text: `**Total Tests:** ${totalTests}  ||  **Passing:** ${totalPassing}  ||  **Failing:** ${totalFailing}  ||  **Pending:** ${totalPending}`,
                color: totalFailing > 0 ? "Attention" : "Good",
                wrap: true
              },
              ...suiteDetails.map(detail => ({
                type: "TextBlock",
                text: detail,
                wrap: true
              }))
            ]
          }
        }
      ]
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const responseText = await response.text();
    if (!response.ok) {
      console.error(`Error sending message. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Send message error:", error);
    return false;
  }
}

// Test function
async function sendResultToTeams(results: any[], webhookUrl: string) {
  const result = await sendTeamsMessage(
    webhookUrl,
    results,
  );
  // clearAllureResults(resultsPath);
}

sendResultToTeams(results, webhookUrl);