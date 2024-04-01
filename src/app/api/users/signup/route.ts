import { connect } from '@/dbConfig/dbConfig';
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';
import { sendEmail } from '@/helpers/mailer';
import { NextRequest, NextResponse} from 'next/server';

connect();

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody 

        const user = await User.findOne({email})

        if(user) {
            return NextResponse.json({error: "User already exists"}, {status: 409})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const saveUser = await newUser.save();

        // send verification email
        await sendEmail({email, emailType: "VERIFY", userId: saveUser._id})

        return NextResponse.json({
            message: "User Register Successfully",
            success: true,
            saveUser
        })
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500});
    }
}