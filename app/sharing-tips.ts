export type SharingTip = {
  title: string;
  idea: string;
  example: string;
  topic: string;
};

export const sharingTips: SharingTip[] = [
  {
    title: 'Start with a small moment',
    idea: 'A detail from your day can be enough to let someone into your world.',
    example: 'I took a different way home today. It was quieter, and I really liked it.',
    topic: 'Was there a little moment today that stayed with you?',
  },
  {
    title: 'Give a preference a little space',
    idea: 'You can say what you would enjoy without needing a big reason.',
    example: 'I’d love a slow morning this weekend. Maybe coffee together without making plans right away?',
    topic: 'What would a comfortable weekend look like for each of us?',
  },
  {
    title: 'Share what caught your curiosity',
    idea: 'An unfinished thought can be a lovely conversation starter.',
    example: 'I heard about a pottery class today and wondered whether I’d enjoy making something with my hands.',
    topic: 'Is there something new you’ve been curious to try?',
  },
  {
    title: 'Name a moment you appreciated',
    idea: 'A specific detail can make appreciation feel personal and natural.',
    example: 'When you asked how that meeting went, I felt remembered. I liked that.',
    topic: 'What small things help each of us feel cared for?',
  },
  {
    title: 'Let a memory open the conversation',
    idea: 'A song, a smell, or a familiar place can be an easy way into a story.',
    example: 'That song reminded me of the bus rides I used to take after school. I always sat by the window.',
    topic: 'What ordinary thing brings back a good memory for you?',
  },
  {
    title: 'Say what kind of listening would help',
    idea: 'A small request can make sharing feel more comfortable.',
    example: 'Could I tell you something from today? I’d like a little listening before we think about solutions.',
    topic: 'When we talk about a hard day, what kind of support feels good?',
  },
  {
    title: 'Share a small piece of joy',
    idea: 'You can let someone know you through the things you enjoy, too.',
    example: 'I found a song I keep replaying. There’s something about the chorus that makes me smile.',
    topic: 'What have you been enjoying lately, even if it seems small?',
  },
  {
    title: 'Leave room for “I’m not sure yet”',
    idea: 'You do not need a finished opinion before you speak.',
    example: 'I’m not sure how I feel about that invitation yet. Part of me wants to go, and part of me wants a quiet night.',
    topic: 'Is there anything you’re still making up your mind about?',
  },
  {
    title: 'Offer a small invitation',
    idea: 'Say what you would like, with space for both of your preferences.',
    example: 'I’d enjoy a short walk together after dinner. Would that feel good to you tonight?',
    topic: 'What is one simple way we’d like to spend time together?',
  },
  {
    title: 'Choose how much to share',
    idea: 'A little context is enough. The rest can stay with you.',
    example: 'I’ve had a lot on my mind today. I’m not ready to talk about all of it, but I’d like some quiet company.',
    topic: 'What helps each of us feel close when we don’t feel like talking much?',
  },
  {
    title: 'Talk about an everyday comfort',
    idea: 'Ordinary routines can reveal something meaningful about you.',
    example: 'Making tea before bed has become my favorite part of the evening. It helps me feel settled.',
    topic: 'What small ritual makes your day feel more like your own?',
  },
  {
    title: 'Share a point of view gently',
    idea: 'Try describing your own experience, then leave room for theirs.',
    example: 'I tend to enjoy smaller gatherings because I can settle into a conversation. What is it like for you?',
    topic: 'What kinds of social plans feel energizing or restful to each of us?',
  },
  {
    title: 'Let someone in on a small hope',
    idea: 'A hope does not have to become a plan or a promise.',
    example: 'I’ve been imagining taking a day trip somewhere green. I don’t have a plan; I just like the thought.',
    topic: 'What is something you would enjoy looking forward to?',
  },
  {
    title: 'Notice what helped you feel close',
    idea: 'Naming a comfortable moment can help you understand what you enjoy together.',
    example: 'I liked cooking together yesterday. We weren’t talking much, but I felt close to you.',
    topic: 'When do we feel connected without having to do anything special?',
  },
  {
    title: 'Ask for a little time',
    idea: 'Taking a pause can be part of expressing yourself.',
    example: 'I do want to tell you what I think. Could I take a little time to find the words?',
    topic: 'How could we make it easier to pause a conversation and return to it?',
  },
  {
    title: 'Share something that surprised you',
    idea: 'A small surprise gives a conversation somewhere easy to begin.',
    example: 'I thought I’d hate going to lunch on my own, but I actually enjoyed having a little space.',
    topic: 'Has anything surprised you about yourself recently?',
  },
  {
    title: 'Bring a little of your world with you',
    idea: 'A book, a photo, or something you noticed can give your words a starting point.',
    example: 'I took this photo because the light looked beautiful. I wanted to show you what I noticed.',
    topic: 'What caught your attention today that I might not have seen?',
  },
  {
    title: 'Put a preference into a simple sentence',
    idea: 'Start with “I’d prefer” and let the sentence be enough.',
    example: 'I’d prefer to pick a restaurant before we head out. I find it easier to relax that way.',
    topic: 'What small choices make shared plans more comfortable for us?',
  },
  {
    title: 'Share one feeling, if you want to',
    idea: 'You can name a feeling without explaining every part of it.',
    example: 'I’m feeling a little tender today. I don’t have much more to say about it, but a hug would feel nice.',
    topic: 'What helps you feel supported on a sensitive day?',
  },
  {
    title: 'Let a light topic count',
    idea: 'Playful, ordinary conversations can be a way of sharing yourself.',
    example: 'If I could have breakfast anywhere tomorrow, I’d choose a little café by the sea.',
    topic: 'If we had a completely free afternoon, how would each of us spend it?',
  },
  {
    title: 'Make room for a changing mind',
    idea: 'You can share a new preference even if it is different from what you used to want.',
    example: 'I used to want busy weekends, but lately I’ve been enjoying more time at home. I’m still noticing that change.',
    topic: 'Has anything you enjoy or need changed a little lately?',
  },
];

// Count calendar days, rather than elapsed local hours, so daylight saving
// changes never skip or repeat an idea. The date comes from the visitor's device.
export function sharingTipForDate(date: Date): SharingTip {
  const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
  return sharingTips[((day % sharingTips.length) + sharingTips.length) % sharingTips.length];
}
