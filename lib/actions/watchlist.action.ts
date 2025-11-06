'use server';

import Watchlist from "@/database/models/watchlist.model";
import {connectToDatabase} from "@/database/mongoose";


/**
 * Return watchlist symbols for a user identified by email.
 * - If user not found, returns an empty array.
 * - Catches and logs errors and returns empty array on error.
 */
export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
    try {
        const mongoose = await connectToDatabase();
        const db =  mongoose.connection.db;
        if(!db) throw new Error("MongoDB connection not found.");


        const user = await db.collection("user").findOne <{_id?: unknown,id?:string,email?:string}>({email},);

        if (!user || !user._id) return [];

        const userId = (user.id as string) || String(user._id) || '';

        if(!userId) return [];

        const items = await Watchlist.find({ userId },{symbol:1}).lean();
        return items.map((i: { symbol: string }) => String(i.symbol));
    } catch (err) {
        console.error('getWatchlistSymbolsByEmail error:', err);
        return [];
    }
}