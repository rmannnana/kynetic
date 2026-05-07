import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    register(@Body() body: { email: string; password: string }) {
        return this.authService.register(body.email, body.password);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@CurrentUser() user: any) {
        return this.authService.login(user);
    }

    @Post('refresh')
    refresh(@Body('refreshToken') token: string) {
        return this.authService.refresh(token);
    }

    @Post('logout')
    logout(@Body('refreshToken') token: string) {
        return this.authService.logout(token);
    }

    @UseGuards(GoogleAuthGuard)
    @Get('google')
    googleAuth() { }

    @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    googleCallback(@CurrentUser() user: any) {
        return this.authService.login(user);
    }
}