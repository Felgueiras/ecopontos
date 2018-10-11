
// icons
import bikeIcon from "../img/icones/24x24px/tabela_atividades/bicicleta.svg";
import checkInIcon from "../img/icones/24x24px/tabela_atividades/checkin.svg";
import quizzesIcon from "../img/icones/24x24px/tabela_atividades/quiz.svg";
import walkIcon from "../img/icones/24x24px/tabela_atividades/caminhada.svg";
import energyIcon from "../img/icones/24x24px/tabela_atividades/energia.svg";
import bonusIcon from "../img/icones/24x24px/lojas/bonus.svg";

class ActivityUtils {

    static getInfo(activity) {
        let activityName, activityIcon, activityInfo;
        // TODO: activityInfo
        switch (activity) {
            case 'walking': case "user_walking_context":
                activityName = 'Caminhada';
                activityIcon = walkIcon;
                activityInfo = 'Something'
                break;
            case 'biking': case "user_biking_context":
                activityName = 'Bicicleta';
                activityIcon = bikeIcon;
                activityInfo = 'Something'
                break;
            case 'elearning':
                activityName = 'Quizzes';
                activityIcon = quizzesIcon;
                activityInfo = 'Something'
                break;
            case 'electricity':
                activityName = 'Poupança\nenergética';
                activityIcon = energyIcon;
                activityInfo = 'Something'
                break;
            case 'checkin':
                activityName = 'Check-ins';
                activityIcon = checkInIcon;
                activityInfo = 'Something'
                break;
            case 'bonus':
                activityName = 'Bónus';
                activityIcon = bonusIcon;
                activityInfo = 'Something'
                break;
            case 'created':
                activityName = 'Novo user';
                activityIcon = checkInIcon;
                activityInfo = 'Something'
                break;
            default:
                break;
        }
        return { activityName, activityIcon, activityInfo};
    }

    static getIconByIndex(index){
        const icons = [bonusIcon, energyIcon, bonusIcon, quizzesIcon, checkInIcon, bikeIcon];
        return icons[index];

    }
}

export default ActivityUtils