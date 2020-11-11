import { Request, Response } from 'express';
import pool from '../database';

class AllController {
    codepublication:any=[];
    public async getspecificcourse(req: Request, res: Response) :Promise<void>  {
        const { id } = req.params;
        const cursos = await pool.query('select course.codecourse,course.name ,courseProfessor.codeCourseProfessor from course inner join courseProfessor on course.codeCourse=courseProfessor.course_codeCourse inner join professor on courseProfessor.professor_codeProfessor =professor.codeProfessor where professor.codeProfessor=?',[id]); 
        res.json(cursos)
    }
    public async getallinicio(req: Request, res: Response): Promise<void> {
        const cursos = await pool.query('SELECT * FROM course order by name'); 
        const profesores = await pool.query('SELECT * FROM professor order by names'); 
        const publicaciones = await pool.query('select course.name, professor.names as namesp ,professor.lastnames as lastnamesp,users.carne ,publication.codepublication, users.names,users.lastnames ,publication.message ,publication.datepublication ,publication.typepublication,courseprofessor.codecourseprofessor,courseprofessor.course_codecourse,courseprofessor.professor_codeprofessor  from publication inner join users on publication.user_carne=users.carne inner join courseprofessor on publication.courseprofessor_code=courseprofessor.codecourseprofessor inner join professor on publication.professor_codeprofessor=professor.codeprofessor inner join course on publication.course_codecourse=course.codecourse order by publication.codepublication desc'); 
        res.json([cursos,profesores,publicaciones])
    }
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const result = await pool.query('INSERT INTO users set ?', [req.body]);
            res.json({ message: 'Usuario guardado Exitosamente' });    
        } catch (error) {
            res.json({ message: 'Hubo un errror al guardar el usuario' });    
        }
        
    }
    public async getOne(req: Request, res: Response): Promise<any> {
        const { carne } = req.params;
        const users = await pool.query('SELECT * FROM users WHERE carne = ?', [carne]);
        console.log(users.length);
        if (users.length > 0) {
            return res.json(users[0]);
        }
        res.json({ carne: -1 });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id ,newpass} = req.body;
        const oldGame = req.body;
        await pool.query('update users set password=? where carne=?;', [newpass, id]);
        res.json({ message: "Contraseña guardada correctamente" });
    }

    public async createpublication(req: Request, res: Response): Promise<void> {
        let cod=await pool.query('select count(*) as maximo from publication');

        console.log(req.body);
        

        try {
            const result = await pool.query('INSERT INTO  publication VALUES (?,?,SYSDATE(),?,?,?,?,?)', [Number(cod[0].maximo),req.body.message,req.body.typepublication,req.body.professor_codeprofessor,req.body.courseprofessor_code,req.body.course_codecourse,req.body.user_carne]);
            res.json({ message: 'Publicacion guardar exitosamente' });    
        } catch (error) {
            console.log(error)
            res.json({ message: "Error al guardar la publicacion" });    
        }
        
    }

    public async filtrar(req: Request, res: Response): Promise<void> {
        const { tipo,profesor,curso } = req.body;
        let publicaciones =[]
        if(tipo==0){
            
            publicaciones = await pool.query('select course.name, professor.names as namesp ,professor.lastnames as lastnamesp,users.carne ,publication.codepublication, users.names,users.lastnames ,publication.message ,publication.datepublication ,publication.typepublication,courseprofessor.codecourseprofessor,publication.course_codecourse,publication.professor_codeprofessor  from publication inner join users on publication.user_carne=users.carne inner join courseprofessor on publication.courseprofessor_code=courseprofessor.codecourseprofessor inner join professor on publication.professor_codeprofessor=professor.codeprofessor inner join course on publication.course_codecourse=course.codecourse where publication.course_codecourse!=0 order by publication.codepublication desc'); 
        }
        else if(tipo==1){
            publicaciones = await pool.query('select course.name, professor.names as namesp ,professor.lastnames as lastnamesp,users.carne ,publication.codepublication, users.names,users.lastnames ,publication.message ,publication.datepublication ,publication.typepublication,courseprofessor.codecourseprofessor,publication.course_codecourse,publication.professor_codeprofessor  from publication inner join users on publication.user_carne=users.carne inner join courseprofessor on publication.courseprofessor_code=courseprofessor.codecourseprofessor inner join professor on publication.professor_codeprofessor=professor.codeprofessor inner join course on publication.course_codecourse=course.codecourse where publication.professor_codeprofessor!=0 order by publication.codepublication desc'); 
        }
        else if(tipo==2){
            publicaciones = await pool.query('select course.name, professor.names as namesp ,professor.lastnames as lastnamesp,users.carne ,publication.codepublication, users.names,users.lastnames ,publication.message ,publication.datepublication ,publication.typepublication,courseprofessor.codecourseprofessor,publication.course_codecourse,publication.professor_codeprofessor  from publication inner join users on publication.user_carne=users.carne inner join courseprofessor on publication.courseprofessor_code=courseprofessor.codecourseprofessor inner join professor on publication.professor_codeprofessor=professor.codeprofessor inner join course on publication.course_codecourse=course.codecourse where publication.course_codecourse=? order by publication.codepublication desc',[curso]); 
            
        }
        else if(tipo==3){
            publicaciones = await pool.query('select course.name, professor.names as namesp ,professor.lastnames as lastnamesp,users.carne ,publication.codepublication, users.names,users.lastnames ,publication.message ,publication.datepublication ,publication.typepublication,courseprofessor.codecourseprofessor,publication.course_codecourse,publication.professor_codeprofessor  from publication inner join users on publication.user_carne=users.carne inner join courseprofessor on publication.courseprofessor_code=courseprofessor.codecourseprofessor inner join professor on publication.professor_codeprofessor=professor.codeprofessor inner join course on publication.course_codecourse=course.codecourse where publication.professor_codeprofessor=? order by publication.codepublication desc',[profesor]); 
        }
        
        res.json(publicaciones)
    }
    public async getonepublication(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        
        const publicaciones = await pool.query('select course.name, professor.names as namesp ,professor.lastnames as lastnamesp,users.carne ,publication.codepublication, users.names,users.lastnames ,publication.message ,publication.datepublication ,publication.typepublication,courseprofessor.codecourseprofessor,courseprofessor.course_codecourse,courseprofessor.professor_codeprofessor  from publication inner join users on publication.user_carne=users.carne inner join courseprofessor on publication.courseprofessor_code=courseprofessor.codecourseprofessor inner join professor on publication.professor_codeprofessor=professor.codeprofessor inner join course on publication.course_codecourse=course.codecourse where publication.codepublication=? order by publication.codepublication desc',[id]); 
        const comentarios = await pool.query('select commentary.message,users.names,users.lastnames from publication inner join commentary on publication.codepublication=commentary.publication_codepublication inner join  users on commentary.user_carne=users.carne where publication.codepublication=?',[id]); 
        res.json([publicaciones,comentarios])
    }
    
    public async createcomentariy(req: Request, res: Response): Promise<void> {
        let cod=await pool.query('select count(*) as maximo from commentary');
        Number(cod[0].maximo);

        try {
            const result = await pool.query('INSERT INTO  commentary VALUES (?,?,?,?)', [Number(cod[0].maximo),req.body.message,req.body.publiccode,req.body.carne]);
            res.json({ message: 'Comentario guardado exitosamente guardar exitosamente' });    
        } catch (error) {
            console.log(error)
            res.json({ message: "Error al guardar al comentar" });    
        }
    }
    
    

   

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({ message: "The game was deleted" });
    }
}

const allController = new AllController;
export default allController;