import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputMask from 'react-input-mask';
import "./style.css"

function Signup() {
    const [CNPJ, setCNPJ] = useState("");
    const [nome, setNome] = useState("");
    const [conta, setConta] = useState("admin@");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const valor = e.target.value;
        let text = valor.split(' ')[0];
        let a = "admin@";
        text = a + text;
        setConta(text);
        setNome(valor);
    }

    const validatePassword = (pass, confirmPass) => {
        if (!pass || !confirmPass) {
            setMessage('');
        } else if (pass === confirmPass) {
            setMessage('');
        } else {
            setMessage("Senhas não correspondem");
        }
    }

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value
        setPassword(newPassword);
        validatePassword(newPassword, confirmPassword);
    }

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value
        setConfirmPassword(newConfirmPassword);
        validatePassword(password, newConfirmPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("As senhas não correspondem.");
            return;
        }

        const data = {
            cnpj: CNPJ,
            nome,
            conta,
            senha: password,
            cargo: "empresa"
        };
        console.log(data);
        try {
            const response = await axios.post('https://integrador-backend.herokuapp.com/cadastro', data);
            alert("Conta criada com sucesso!");
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error(error.response?.data || "Erro ao criar conta");
            alert(error.response?.data.message || "Erro ao criar conta");
        }
    };

    const handleBackToLogin = () => {
        navigate('/');
    };

    return (
        <div>
            <div className='bgImage'>
            </div>
            <div className='imageBox'>
            </div>
            <div className='addUser'>
                <h3>Cadastro</h3>
                <form className='addUserForm'>
                    <div className='inputGroup'>
                        <label htmlFor='CNPJ'>CNPJ</label>
                        <InputMask
                            mask="99.999.999/9999-99"
                            id='CNPJ'
                            autoComplete='off'
                            placeholder='XX.XXX.XXX/0001-XX'
                            value={CNPJ}
                            onChange={(e) => setCNPJ(e.target.value)}
                            required
                        />
                        <label htmlFor='Name'>Nome da empresa</label>
                        <input
                            type='text'
                            id='Name'
                            autoComplete='off'
                            placeholder='nome da empresa'
                            required
                            onChange={handleChange}
                        />
                        <label htmlFor='Conta'>Conta</label>
                        <input
                            type='text'
                            id='Conta'
                            autoComplete='off'
                            required
                            value={conta}
                        />
                        <label htmlFor='Password'>Senha</label>
                        <input
                            type='password'
                            value={password}
                            onChange={handlePasswordChange}
                            id='Password'
                            autoComplete='off'
                            placeholder='enter your password'
                            required
                        />
                        <label htmlFor='Password'>Confirmar senha</label>
                        <input
                            type='password'
                            id='ConfirmPassword'
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            autoComplete='off'
                            placeholder='enter your password'
                            required
                        />
                        {message && <p className='passwordMessage'>{message}</p>}
                        <button
                            type="submit"
                            className="btn btn-primary savebtn"
                            onClick={handleSubmit}
                        >
                            Salvar
                        </button>
                        <button
                            type='button'
                            className='btn btn-secondary'
                            onClick={handleBackToLogin}
                        >
                            Voltar ao Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
