import React from 'react';
import { useEffect } from 'react';
import {useState, useRef} from 'react';
import api from "../../resource/api"
import './signIn.css';
import zewdlogo from '../../resource/images/logo2.jpg';

function ResetPasswordForm() {
    const [newPassword, setNewPassword] = useState('');
    const token = useRef(null);
    useEffect(()=>{
        const searchParameter = new URLSearchParams(window.location.search);
        token.current = searchParameter.get('token');
    })
    
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        console.log(token.current);
        await api.post('auth/resetPassword', {
          newPassword: newPassword, token: token
        }).then(function(res){
            if(res.data.success){
                alert("Password reset successfully")
            }
            else{

            }
        });
        
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };
  
    return (
        <div className="full_content">
            <section>
                <div className="imgBx">
                    <img src={zewdlogo} alt='' />
                </div>
                <div className="contentBx">
                    <div className="formBx">
                        <form onSubmit={handleSubmit}>
                            <div className="inputBx">
                                <label htmlFor="newPassword">New password</label>
                                <input type="password" id="newPassword" name="newPassword" placeholder="Password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                            </div>
                            <div className="inputBx">
                                <label htmlFor="confirmPassword">Confirm password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Password" />
                            </div>
                            <div className="inputBx">
                                <input type="submit" value="Reset password" />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ResetPasswordForm;