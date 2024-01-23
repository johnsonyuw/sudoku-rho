import React from 'react';
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

const IndexPage = () => {
    const router = useRouter();

    const [sudokuGames, setSudokuGames] = useState([]);

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        //插入一条数据记录到supabase的sudokugame中



        const { data, error } = await supabase.from('sudokugame').select('*');
        if (error) console.log('error', error);
        else console.log('data', data);
    };

    const handleClick = (gameId) => {
        if (gameId == 0) {
            gameId = Math.floor(Math.random() * 1000000).toString();
            console.log('按钮被点击了 gameId = 0');
        }
        console.log('按钮被点击了');
        handleInsert();
        //根据gameId获取对应的sudokuGames记录，并把记录存储到 本地


        router.push(`/game/${gameId}`);

    };



    const handleInsert = async () => {
        try {
            //插入一条数据记录到supabase的sudokugame中
            const user = supabase.auth.user();

            const { data, error } = await supabase
                .from("workouts")
                .insert([
                    {
                        title,
                        loads,
                        reps,
                        user_id: user?.id,
                    },
                ])
                .single();
            if (error) throw error;
            alert("Workout created successfully");
            console.log('Inserted record:', data);
            // setSudokuGames([...sudokuGames, data]);
        } catch (error) {
            console.error('Error inserting record:', error);
        }
    };

    // ...

    <button
        style={{
            backgroundColor: 'lightgreen',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
            marginTop: '10px',
        }}
        onClick={handleInsert}
    >
        插入记录
    </button>

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>历史记录</div>
            <table style={{ marginBottom: '10px' }} title='xxx'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Level</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {sudokuGames.map(game => (
                        <tr key={game.id}>
                            <td>
                                <button
                                    style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'blue',
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleClick(game.id)}
                                >
                                    {game.id}
                                </button>
                            </td>
                            <td>{game.level}</td>
                            <td>{game.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button
                    style={{
                        backgroundColor: 'lightblue',
                        border: 'none',
                        color: 'white',
                        padding: '10px 20px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                    }}
                    onClick={() => handleClick(0)}
                >
                    新建
                </button>
            </div>
        </div>
    );
};

export default IndexPage;
