package org.example.sign.controller;

import org.example.sign.util.TLSSigAPIv2;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Description TODO
 * @Date 2023-07-10-14-24
 * @Author qianzhikang
 */
@RestController
@CrossOrigin
public class TengxunyunController {
    // 切换成自己的 appid 和 secret
    TLSSigAPIv2 tlsSigAPIv2 = new TLSSigAPIv2(0, "");

    @GetMapping("/{userId}")
    public String test(@PathVariable("userId") String userId) {
        return tlsSigAPIv2.genUserSig(userId,1800L);
    }
}


