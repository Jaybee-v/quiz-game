import path from 'path';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try{

                //Read the json data file data.json
        const fileContents = '@/src/assets/data.json'
        //Return the content of the data file in json format
        
        return  NextResponse.json(fileContents)
    } catch(err){
        console.log(err);
        
    }

}