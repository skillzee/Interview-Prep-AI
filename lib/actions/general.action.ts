import { db } from "@/firebase/admin";



export async function getInterviewsByUserId(
    userId: string
  ): Promise<Interview[] | null> {
    const interviews = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();
  
    return interviews.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Interview[];
  }



  export async function getLatestInterviews(
    params: GetLatestInterviewsParams
  ): Promise<Interview[] | null> {
    const { userId, limit = 20 } = params;
  
    const snapshot = await db
      .collection("interviews")
      .where("finalized", "==", true)
      .orderBy("createdAt", "desc")
      .limit(50)
      .get();
  
    const allDocs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    console.log("Fetched finalized interviews:", allDocs);
    console.log("Current userId:", userId);
  
    const filtered = allDocs.filter(
      (interview: any) => interview.userId !== userId
    );
  
    console.log("Filtered interviews (others only):", filtered);
  
    return filtered.slice(0, limit) as Interview[];
  }


  export async function getFeedbackByInterviewId(
    params: GetFeedbackByInterviewIdParams
  ): Promise<Feedback | null> {
    const { id, userId } = params;
  
    const querySnapshot = await db
      .collection("feedback")
      .where("interviewId", "==", id)
      .where("userId", "==", userId)
      .limit(1)
      .get();
  
    if (querySnapshot.empty) return null;
  
    const feedbackDoc = querySnapshot.docs[0];
    return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
  }



  export async function getInterviewById(id: string): Promise<Interview | null> {
   const interview = await db.collection("interviews").doc(id).get();
  
    return interview.data() as Interview |null
  }
  