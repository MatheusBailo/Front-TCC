
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Menu } from "./components/menu";
import { api } from "./api/api";
import styles from "./Dashboard.module.css"


function Dashboard(){
    const navigate = useNavigate();
    const[usercount, setUserCount] = useState(0);
    const[productCount, setProductCount] = useState(0);

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if(!storedUser) navigate('/')
    }, [navigate])

    useEffect(() => {
        async function fetchData(){
            try{
                const[userRes, productsRes] = await Promise.all([
                    api.get('/list'),
                    api.get('/list'),
                ])
                setUserCount(userRes.data.lenght)
                setProductCount(productsRes.data.lenght)
            }catch(err){
                console.log("Erro ao buscar dados do bashboard",err)
            }
            
        }
        fetchData()
    },[])
     
    return(
        <section>
            <Menu/>
            <div className={styles.wrapNav}>
                <div className={styles.wrapItem} onClick={() => navigate('/#')}>
                    <p>Criar produtos</p>
                </div>
                <div className={styles.wrapItem} onClick={() => navigate('/#')}>
                    <p>Lista de produtos - ({productCount} produtos)</p>
                </div>
                <div className={styles.wrapItem} onClick={() => navigate('/#')}>
                    <p>Criar usuarios </p>
                </div>
                <div className={styles.wrapItem} onClick={() => navigate('/usersList')}>
                    <p>Lista de usuario - ({usercount} usuarios)</p>
                </div>

            </div>
        </section>
    )
}

export default Dashboard