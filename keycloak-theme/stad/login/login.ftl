<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
    <#if section = "header">
        <div class="custom-header">
            <!-- Título Profesional -->
            <h1>STAD Trazabilidad</h1>
            <p>Gravetal Bolivia S.A.</p>
        </div>
    <#elseif section = "form">
        <div id="kc-form" style="margin-top: 10px;">
          <div id="kc-form-wrapper">
            <#if realm.password>
                <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
                    
                    <div class="pf-c-form__group">
                        <label for="username" class="pf-c-form__label pf-c-form__label-text"><#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if></label>
                        <input tabindex="1" id="username" class="pf-c-form-control" name="username" value="${(login.username!'')}" type="text" autofocus autocomplete="off" />
                    </div>

                    <div class="pf-c-form__group" style="margin-top: 15px;">
                        <label for="password" class="pf-c-form__label pf-c-form__label-text">${msg("password")}</label>
                        <input tabindex="2" id="password" class="pf-c-form-control" name="password" type="password" autocomplete="off" />
                    </div>

                    <div class="pf-c-form__group" style="margin-top: 25px;">
                        <input tabindex="4" class="pf-c-button pf-m-primary pf-m-block" name="login" id="kc-login" type="submit" value="${msg("doLogIn")}"/>
                    </div>
                </form>
            </#if>
          </div>
        </div>
    <#elseif section = "info" >
        <!-- Footer info opcional (ej: recuperación pass) -->
    </#if>
</@layout.registrationLayout>
