/*
 * Copyright (c) 2019 Of Him Code Technology Studio
 * Jpom is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 * 			http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */
package org.dromara.jpom.oauth2.platform;

import lombok.Data;
import lombok.EqualsAndHashCode;
import me.zhyd.oauth.config.AuthConfig;
import me.zhyd.oauth.config.AuthDefaultSource;
import me.zhyd.oauth.request.AuthRequest;
import me.zhyd.oauth.request.AuthWeChatEnterpriseQrcodeRequest;
import org.dromara.jpom.oauth2.BaseOauth2Config;
import org.springframework.util.Assert;

/**
 * @author bwcx_jzy
 * @see AuthDefaultSource#WECHAT_ENTERPRISE
 * @since 2024/04/07
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class WechatEnterpriseOauth2Config extends BaseOauth2Config {

    public static final String KEY = "OAUTH_CONFIG_WECHAT_ENTERPRISE_OAUTH2";
    /**
     * 企业微信，授权方的网页应用ID
     *
     * @since 1.10.0
     */
    private String agentId;

    @Override
    public String provide() {
        return "wechat_enterprise";
    }

    @Override
    public AuthRequest authRequest() {
        Assert.state(this.enabled(), "没有开启此 " + this.provide() + " oauth2");
        return new AuthWeChatEnterpriseQrcodeRequest(this.authConfig());
    }

    @Override
    public AuthConfig authConfig() {
        AuthConfig authConfig = super.authConfig();
        authConfig.setAgentId(this.agentId);
        return authConfig;
    }
}
