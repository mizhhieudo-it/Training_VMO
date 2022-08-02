import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidatorService {
    // params Ngày phát hành - số lượng ngày dùng thử 
    public checkExpirationTime(issueDate: string, daysInTrial: number): boolean {
        // lấy ra ngày hiện tại
        const today = new Date().getTime();
        // lấy ngày user đăng kí tài khoản ()
        const issueDateToMilliseconds = new Date(issueDate).getTime();
        // lấy số ngày dừng thử còn lại 
        const timeFromIssueDateToSeconds = (today - issueDateToMilliseconds) / 1000;
        //  lấy số lượng ngày dùng thử 
        const daysInTrialToSeconds = daysInTrial * 24 * 60 * 60;
        // ngày còn lại > ngày dung thử =>return true
        return daysInTrialToSeconds <= timeFromIssueDateToSeconds;
    }
}
