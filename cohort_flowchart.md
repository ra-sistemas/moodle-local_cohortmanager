Nativamente, o moodle possui o recurso de agrupar usuários em nível de sistema via coortes.

Os recursos no Moodle 4.5 são:
* Atribuir papéis do nível de contexto Usuário entre, por exemplo, Mentor e membros de uma coorte.
* Inscrever usuários em um curso caso eles sejam membros de uma coorte. O método gerencia também os usuários dentro de grupos nos cursos, facilitando agrupamentos. 
* Personalizar o tema visualizado com base na coorte do usuário
* Campos customizáveis de coortes estão disponíveis

```{.mermaid theme=dark width=1200}
flowchart TD

    subgraph Moodle

        Cohort["Coorte: 'Coorte 1'"]
        U1["Usuário 1"]
        U2["Usuário 2"]
        U3["Usuário 3"]
        U4["..."]
        Mentor["Usuário A\n(papel: mentor)"]
        Curso["Curso X"]
    end

    %% === Plugins ===
    subgraph PluginCohortRoles["tool_cohortroles"]
        CR["Associação:\nUsuário A → Coorte 1\n(papel: mentor)"]
        TaskCR["Tarefa agendada\n(tool_cohortroles)"]
    end

    subgraph PluginEnrolCohort["enrol_cohort (nativo)"]
        EnrolInst["Instância de inscrição:\nCoorte 1 → Curso X\n(papel: estudante)"]
        TaskEnrol["Evento de inscrição\n(automático ou via cron)"]
    end

    %% === Resultados ===
    subgraph ResultadoRoles["Relações USER → USER\n(contexto: usuário)"]
        R1["Usuário A → Usuário 1\n(papel: mentor)"]
        R2["Usuário A → Usuário 2\n(papel: mentor)"]
        R3["Usuário A → Usuário 3\n(papel: mentor)"]
        R4["..."]
    end

    subgraph ResultadoEnrol["Inscrições no Curso X\n(contexto: curso)"]
        E1["Usuário 1 → Curso X\n(papel: estudante)"]
        E2["Usuário 2 → Curso X\n(papel: estudante)"]
        E3["Usuário 3 → Curso X\n(papel: estudante)"]
        E4["..."]
    end

    %% === Relações ===
    %% Coorte e membros
    U1 -->|Membro de| Cohort
    U2 -->|Membro de| Cohort
    U3 -->|Membro de| Cohort
    U4 -->|Membro de| Cohort

    %% tool_cohortroles
    Mentor -->|Define associação| CR
    Cohort -->|Referenciada em| CR
    CR --> TaskCR
    TaskCR -->|Cria relações| R1
    TaskCR -->|Cria relações| R2
    TaskCR -->|Cria relações| R3
    TaskCR -->|Cria relações| R4

    %% enrol_cohort
    Cohort -->|Vinculada à| EnrolInst
    Curso -->|Contém instância| EnrolInst
    EnrolInst --> TaskEnrol
    TaskEnrol -->|Inscreve membros| E1
    TaskEnrol -->|Inscreve membros| E2
    TaskEnrol -->|Inscreve membros| E3
    TaskEnrol -->|Inscreve membros| E4
```