import { TouchableOpacity, View,Text } from "react-native";
import { styles } from "./styles";
import { DuoInfo } from "../DuoInfo/index"
import { THEME } from "../../theme";
import React from "react";
import { GameController } from "phosphor-react-native"

export interface DuoCardProps {
    HourEnd: string;
    hourStart: string;
    id: string;
    name: string;
    useVoiceChannel: boolean;
    weekDays: string[];
    yearsPlayng: number;
}

interface Props {
    data: DuoCardProps;
    onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
    return (
        <View style={styles.container}>
            <DuoInfo
                label="Nome"
                value={data.name}
            />
            <DuoInfo
                label="Tempo de Jogo"
                value={`${data.yearsPlayng} anos`}
            />
            <DuoInfo
                label="Disponibilidade"
                value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.HourEnd}`}
            />
            <DuoInfo
                label="Chamada de áudio?"
                value={data.useVoiceChannel ? "Sim" : "Não"}
                colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
            />

            <TouchableOpacity style={styles.button} onPress={onConnect}>
                <GameController
                    color={THEME.COLORS.TEXT}
                    size={20}
                />   

                <Text style={styles.buttonTitle}>
                    Conectar
                </Text>
            </TouchableOpacity>
        </View>
    )
}