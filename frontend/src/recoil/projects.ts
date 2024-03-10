import { atom } from 'recoil';
import { Project } from '../types/project';

const getDefaultProjects = (): Array<Project> => {
    // load from local storage
    const defaultProjects = localStorage.getItem('projects');
    if (defaultProjects) {
      return JSON.parse(defaultProjects) as Array<Project>;
    } else {
        // set default to local storage
        localStorage.setItem('projects', JSON.stringify([]));
        return [] as Array<Project>;
    }
}

export const ProjectsState = atom({
    key: 'ProjectsState',
    default: getDefaultProjects(),
    // automatically save to local storage ??? TODO: kinda scary though
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet((newProjects) => {
                localStorage.setItem('projects', JSON.stringify(newProjects));
            });
        },
    ],
});