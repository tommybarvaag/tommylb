"use client";

import { useState } from "react";
import { Button } from "../button";
import Timeline from "./timeline";
import TimelineHeading from "./timeline-heading";
import TimelinePost from "./timeline-post";
import TimelineSection from "./timeline-section";
import TimelineSectionHeading from "./timeline-section-heading";
import TimelineText from "./timeline-text";

type TimelineFromBirthUntilNowProps = {
  showAll?: boolean;
  heading?: string;
};

export default function TimelineFromBirthUntilNow({
  showAll = false,
  heading
}: TimelineFromBirthUntilNowProps) {
  const [showingAll, setShowingAll] = useState<boolean>(showAll);

  return (
    <Timeline heading={heading}>
      <TimelineSection>
        <TimelineSectionHeading>2022</TimelineSectionHeading>
        <TimelinePost>
          <TimelineHeading>Became a dad of two 👨‍👩‍👧‍👦</TimelineHeading>
          <TimelineText>
            My partner and I welcomed our second child, a boy, into the world. Our soon to be
            3-year-old also earned a new title: big sister!
          </TimelineText>
        </TimelinePost>
        <TimelineSectionHeading>2021</TimelineSectionHeading>
        <TimelinePost>
          <TimelineHeading>Became a team lead</TimelineHeading>
          <TimelineText>
            Following a restructure within my division the need for team leads rose. I was offered
            the promotion, and I felt that it aligned with my career trajectory.
          </TimelineText>
        </TimelinePost>
      </TimelineSection>
      <TimelineSection>
        <TimelineSectionHeading>2020</TimelineSectionHeading>
        <TimelinePost>
          <TimelineHeading>Covid-19 stole all other headline for a while</TimelineHeading>
          <TimelineText>
            Covid-19 is terrible, but for me and my partner that recently became parents it was also
            a stroke of luck. Work shut down and home office was suddenly the new standard. I felt
            sincerely lucky to get to spend all my breaks, lunches and stretches with my partner and
            little baby girl.
          </TimelineText>
        </TimelinePost>
        <TimelinePost>
          <TimelineHeading>Became a dad 👨‍👩‍👧</TimelineHeading>
          <TimelineText>
            Hard to describe with words what it feels to become a parent. Filled with immense amount
            of pride for my partner that delivered our baby girl and &quot;life turned upside down
            in a matter of seconds&quot; full of love for our new family member.
          </TimelineText>
        </TimelinePost>
        <TimelinePost>
          <TimelineHeading>Became a senior consultant</TimelineHeading>
          <TimelineText>
            I was looking for a new challenge and lucky me, Knowit is a large corporation with
            multiple career paths. After initiating a dialog with my nearest leader, we agreed that
            it was time for me to take on further responsibility.
          </TimelineText>
        </TimelinePost>
        <TimelinePost>
          <TimelineHeading>Became a Tech Lead 👨🏻‍💻</TimelineHeading>
          <TimelineText>
            I applied for Knowit&apos;s tech lead course in 2019 and got accepted. Through coursing
            in 2019 and 2020 with lectures from Dr. Venkat Subramaniam, Simon Brown, Sam Newman, and
            several others. I got my diploma as a tech lead.
          </TimelineText>
        </TimelinePost>
      </TimelineSection>
      {showingAll ? (
        <>
          <TimelineSection>
            <TimelineSectionHeading>2019</TimelineSectionHeading>
            <TimelinePost>
              <TimelineHeading>Bought a townhouse</TimelineHeading>
              <TimelineText>
                It didn&apos;t take long before my partner sold her apartment and we went townhouse
                shopping. The reason for that lies further in the future!
              </TimelineText>
            </TimelinePost>
            <TimelinePost>
              <TimelineHeading>Sold my apartment</TimelineHeading>
              <TimelineText>
                Me and my partner were getting serious and we both owned apartments. We agreed that
                I would sell my apartment, and move in with her as it was more central.
              </TimelineText>
            </TimelinePost>
          </TimelineSection>
          <TimelineSection>
            <TimelineSectionHeading>2017</TimelineSectionHeading>
            <TimelinePost>
              <TimelineHeading>Bought my first apartment</TimelineHeading>
              <TimelineText>
                I had been saving for years. In Norway there is several steps for the bank to follow
                before giving a loan. One of those is that you need 15% of the loan amount yourself.
              </TimelineText>
            </TimelinePost>
            <TimelinePost>
              <TimelineHeading>Joined Knowit as a consultant</TimelineHeading>
              <TimelineText>
                Funny thing is I felt (and have later been told) that i tanked my interview. The
                first part of the interview was a classic talk that I felt went decent enough. The
                second part were a graphic code challenge that still makes me feel tense to this
                day. Somehow, I managed to snag the job.
              </TimelineText>
            </TimelinePost>
          </TimelineSection>
          <TimelineSection>
            <TimelineSectionHeading>2014</TimelineSectionHeading>
            <TimelinePost>
              <TimelineHeading>Got my first job as a web developer at Digitroll AS</TimelineHeading>
              <TimelineText>
                Throughout my first months at Digitroll I finally felt like I understood
                programming. The feeling was long overdue, and it felt great. Digitroll set me up
                with one of the biggest fish and I got do delve into the deepest backend and the
                shiniest frontend. I was hooked.
              </TimelineText>
            </TimelinePost>
          </TimelineSection>
          <TimelineSection>
            <TimelineSectionHeading>2013</TimelineSectionHeading>
            <TimelinePost>
              <TimelineHeading>Graduated university</TimelineHeading>
              <TimelineText>Graduation papers in hand — it was time to find a job.</TimelineText>
            </TimelinePost>
          </TimelineSection>
          <TimelineSection>
            <TimelineSectionHeading>2010</TimelineSectionHeading>
            <TimelinePost>
              <TimelineHeading>Wanted to leave University</TimelineHeading>
              <TimelineText>
                I struggled with programming in the intro courses. It didn&apos;t help that we
                learned obscure things like how to print a Christmas tree or star with a for-loop to
                start it all — but I&apos;m glad I stuck with it.
              </TimelineText>
            </TimelinePost>
            <TimelinePost>
              <TimelineHeading>
                Accepted at Western Norway University of Applied Sciences
              </TimelineHeading>
              <TimelineText>I started my degree.</TimelineText>
            </TimelinePost>
            <TimelinePost>
              <TimelineHeading>Moved to Bergen</TimelineHeading>
              <TimelineText>
                I moved from Alver municipality to Bergen, more precisely a part of Bergen called
                Landås with two good friends. Travel time by car from the place i grew up and to
                Bergen is about 1 hour.
              </TimelineText>
            </TimelinePost>
          </TimelineSection>
          <TimelineSection>
            <TimelineSectionHeading>2008</TimelineSectionHeading>
            <TimelinePost>
              <TimelineHeading>Met with my high school counselor</TimelineHeading>
              <TimelineText>
                I didn&apos;t know what I wanted to do after high school and was contemplating a
                year off. The simple question &quot;what do you do in your spare time?&quot; from my
                high school counselor prompted me to answer, &quot;I sit at my computer&quot;, and
                it made me realize that a degree in computer engineering was the way to go forward.
              </TimelineText>
            </TimelinePost>
            <TimelinePost>
              <TimelineHeading>Took high school IT class</TimelineHeading>
              <TimelineText>
                We learned Access Databases, Photoshop and Flash with some minor coding.
              </TimelineText>
            </TimelinePost>
          </TimelineSection>
          <TimelineSection>
            <TimelineSectionHeading>2004</TimelineSectionHeading>
            <TimelinePost>
              <TimelineHeading>First meeting with scripting</TimelineHeading>
              <TimelineText>
                A friend introduced me to Diablo II: Lord of Destruction, a game by Blizzard. The
                game was fun, but it was riddled with bots, and it didn&apos;t take long before I
                joined in and ran bots myself. The most common bots were written in Lua scripts, and
                you needed to tinker within the script files to make the bot work well. It sparked
                an interest.
              </TimelineText>
            </TimelinePost>
          </TimelineSection>
          <TimelineSection>
            <TimelineSectionHeading>1990</TimelineSectionHeading>
            <TimelinePost>
              <TimelineHeading>Born</TimelineHeading>
              <TimelineText>At a hospital in Bergen, Norway.</TimelineText>
            </TimelinePost>
          </TimelineSection>
        </>
      ) : null}
      {showingAll ? null : (
        <div className="flex justify-center">
          <Button onClick={() => setShowingAll(true)}>Show all</Button>
        </div>
      )}
    </Timeline>
  );
}
