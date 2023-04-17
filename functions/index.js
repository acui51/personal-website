const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.updateLeaderboard = functions
  .region("us-central1")
  .https.onCall(async (data, context) => {
    const db = admin.firestore();
    const { colToPost, dbToPost, leaderboard } = data;

    try {
      await db
        .collection(dbToPost)
        .doc(colToPost)
        .update({
          leaderboard: leaderboard.slice(0, 5),
        });
    } catch (e) {
      console.error(e);
    }
    console.log(`Updated leaderboard for document ${colToPost}`);

    return { success: true };
  });
