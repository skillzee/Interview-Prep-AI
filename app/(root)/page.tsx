import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import { getCurrentUser, getInterviewsByUserId, getLatestInterviews } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async() => {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);
  // console.log("Current user ID:", user?.id);



  // const userInterviews = await getInterviewByUserId(user?.id!);
  // const latestInterviews = await getLatestInterviews({userId: user?.id!});

  const hasPastintervews = userInterviews?.length > 0;

  const hasUpcomingInterviews = allInterview?.length >0;
  console.log(hasUpcomingInterviews);
  return (
    <>
      <section className='card-cta'>
        <div className=' flex flex-col gap-6 max-w-lg'>
          <h2>Get Interview Ready with AI-Powered Practice & Feedback</h2>
          <p className=' text-lg'>
            Practice on real interview questions and get instant feedback
          </p>

          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href='/interview'>Start an interview</Link>
          </Button>
        </div>
        <Image src="/robot.png" alt='robo-dude' width={400} height={400} className=' max-sm:hidden'/>
      </section>

      <section className=' flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>

        <div className='interviews-section'>
          {
            hasPastintervews ? (
              userInterviews?.map((interview)=>(
                <InterviewCard {...interview} key={interview.id}/>

              )
            )
          ):(
            <p> You have not taken any interviews</p>
          )
          }
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  )
}

export default page