import { getChatGPTUser } from '../../chatgpt-auth';
import { getDb } from '../../../db';
import { entries } from '../../../db/schema';
import { and, eq, desc } from 'drizzle-orm';
import { z } from 'zod';
export const dynamic = 'force-dynamic';
const schema = z.object({
 id: z.string().uuid().optional(), kind: z.enum(['daily','unsaid','interaction','plan']),
 date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v => {const d = new Date(v+'T12:00:00Z'); return !isNaN(d.getTime()) && d.toISOString().slice(0,10) === v;}),
 content: z.string().max(15000).default(''), opinion: z.string().max(10000).default(''),
 feelings: z.array(z.string().max(40)).max(15).default([]),
 status: z.enum(['private','maybe','shared','released','chosen','tried','set-aside']).default('private'),
 context: z.string().max(10000).default(''),
}).refine(v => !!(v.content.trim() || v.opinion.trim() || v.feelings.length || v.context.trim()), {message: 'Add a thought or feeling before saving.'});
const json = (data: unknown, status=200) => Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
function sameOrigin(r: Request) { const origin = r.headers.get('origin'); return !!origin && origin === new URL(r.url).origin; }
export async function GET() {
 const user = await getChatGPTUser(); if(!user) return json({error:'Please sign in to see your notes.'},401);
 try {const rows = await getDb().select().from(entries).where(eq(entries.userId,user.userId)).orderBy(desc(entries.date),desc(entries.createdAt));
 return json(rows.map(({userId, ...r})=>({...r, feelings:JSON.parse(r.feelings)})));}
 catch {return json({error:'Your notes could not be loaded. Please try again.'},503);}
}
export async function POST(r: Request) {
 const user = await getChatGPTUser(); if(!user) return json({error:'Please sign in to save your notes.'},401);
 if(!sameOrigin(r)) return json({error:'Please save from this site.'},403);
 if(Number(r.headers.get('content-length')||0)>100000) return json({error:'This note is too long.'},413);
 let input; try {input = schema.safeParse(await r.json());}catch{return json({error:'This note could not be read.'},400);}
 if(!input.success) return json({error:input.error.issues[0].message},400);
 const {id,feelings,...rest} = input.data;
 try {const db = getDb(); const now=new Date().toISOString();
 if(id) {const found=await db.select({id:entries.id}).from(entries).where(and(eq(entries.id,id),eq(entries.userId,user.userId))).get(); if(!found) return json({error:'This note was not found.'},404);
 await db.update(entries).set({...rest,feelings:JSON.stringify(feelings),updatedAt:now}).where(and(eq(entries.id,id),eq(entries.userId,user.userId))); return json({id});}
 const newId=crypto.randomUUID(); await db.insert(entries).values({...rest,id:newId,userId:user.userId,feelings:JSON.stringify(feelings),createdAt:now,updatedAt:now}); return json({id:newId},201);
 } catch {return json({error:'Your note has not been saved. Your words are still here; please try again.'},503);}
}
export async function DELETE(r: Request) {
 const user = await getChatGPTUser(); if(!user) return json({error:'Please sign in.'},401);
 if(!sameOrigin(r)) return json({error:'Please delete from this site.'},403);
 const id=new URL(r.url).searchParams.get('id'); if(!id) return json({error:'A note ID is required.'},400);
 try {await getDb().delete(entries).where(and(eq(entries.id,id),eq(entries.userId,user.userId))); return json({ok:true});}catch{return json({error:'The note could not be deleted. Please try again.'},503);}
}
