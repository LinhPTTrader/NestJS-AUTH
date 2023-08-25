import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const saltRounds = 10;

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService
    ) {

    }
    // hàm này đơn giản là kiểm tra xem đăng nhập hợp lệ hay không
    async validateUser(username: string, password: string) {
        const user = await this.userService.findUserByUserName(username); // Tìm User có tồn tại hay không
        //Kiểm tra xem có tồn tại User không, nếu có kiểm tra xem có đúng password không
        if (user && await bcrypt.compare(password, user.password)) {
            // gán password là password trong user và result là các giá trị còn lại trong User và Result không chứa Password

            let { password, ...result } = user.toJSON();
            return result
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            username: user.email,
            sub: user._id

        }
        return {
            ...user, access_token: this.jwtService.sign(payload)
        }
    }
}
