// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { updateDoc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCImMGbTVcoqLqDseon5TAGy5_GHfKGx4U",
  authDomain: "personal-website-raceme.firebaseapp.com",
  projectId: "personal-website-raceme",
  storageBucket: "personal-website-raceme.appspot.com",
  messagingSenderId: "74355242276",
  appId: "1:74355242276:web:59bc0dd042cfebebc5afb1",
};

export default async function helloAPI(req, res) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const { body } = req.query;

  await updateDoc(doc(db, "corpus", `corpus-${corpusId}`), {
    leaderboard: body.newLeaderboard.slice(0, 5),
  });

  res.status(200).json();
}
