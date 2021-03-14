<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class Users extends Controller
{
    protected $dataApi = [
        'error' => '',
        'success' => []
    ];
   public function list()
   {
    
    foreach(Employee::all() as $employee){
        $user = User::find($employee->id_user);
        $userArray = array();

        $userArray['nome'] = $user->name;
        $userArray['email'] = $user->email;
        $userArray['password'] = $user->password;
        $userArray['cpf'] = $user->cpf;
        $userArray['telefone'] = $user->telefone;
        $userArray['nascimento'] = $user->nascimento;
        $userArray['idade'] = $this->determineAge($user->nascimento);
        $userArray['iscpf'] = $this->isCpfOrCnpj($user->cpf);
        $userArray['accessLevel'] = $employee->acesslevel;
  
        $this->dataApi['success'][] = $userArray;
    
    }
        return $this->dataApi;
    
   }
  
   public function create(Request $request)
   {
       $data = $request->only([
           'name', 'email', 'password', 'cpf', 'telefone','nascimento', 'acesslevel'
       ]);
       $employee= new Employee();
       $user = new User();

       $user->name = mb_convert_case($data['name'], MB_CASE_TITLE, 'UTF8');
       $user->email = $data['email'];
       $user->password = Hash::make($data['password']);
       $user->cpf = $data['cpf'];
       $user->telefone = $data['telefone'];
       $user->nascimento = $data['nascimento'];
       $user->save();

       $findUser = User::where('cpf', $data['cpf'])->get();

       $employee->id_user = $findUser[0]->id;
       $employee->acesslevel = mb_convert_case($data['acesslevel'], MB_CASE_TITLE, 'UTF8');
       $employee->save();

       $save = ['user' => $findUser, 'acesslevel' => $employee->acesslevel];

       $this->dataApi['success'][] = $save;

       return $this->dataApi;
   }

   public function show($id)
   {
       $user = User::find($id);

       if($user){
            $userArray = array();

        $userArray['nome'] = $user->name;
        $userArray['password'] = $user->password;
        $userArray['cpf'] = $user->cpf;
        $userArray['telefone'] = $user->telefone;
        $userArray['nascimento'] = $user->nascimento;
        $userArray['idade'] = $this->determineAge($user->nascimento);
        $userArray['iscpf'] = $this->isCpfOrCnpj($user->cpf);


        $this->dataApi['success'][] = $user;

            return $this->dataApi;
       }else{
            $this->dataApi['error'] = 'Usuário não cadastrado';
            return  $this->dataApi;
       }
   }

   public function edit(Request $request, $id)
   {
    $data = $request->only([
        'name', 'email', 'password', 'cpf', 'telefone','nascimento', 'acesslevel'
    ]);

    $user = User::find($id);
    $employee= Employee::where('id_user', $user->id)->get();

    $user->name = mb_convert_case($data['name'], MB_CASE_TITLE, 'UTF8');
    // $user->email = $data['email'];
    $user->password = Hash::make($data['password']);
    $user->cpf = $data['cpf'];
    $user->telefone = $data['telefone'];
    $user->nascimento = $data['nascimento'];
    $user->save();

    $employee[0]->acesslevel = mb_convert_case($data['acesslevel'], MB_CASE_TITLE, 'UTF8');
    $employee[0]->save();
    

    $save = ['user' => $user, 'acesslevel' => $employee[0]->acesslevel];

    $this->dataApi['success'][] = $save;

    return $this->dataApi;

   }
   public function delete($id)
   {
       $user = User::find($id);
       $employee = Employee::where('id_user', $user->id);

       $arrayReturn = [
           'user' => $user,
           'employee' => $employee
       ];
       $user->delete();
       $employee->delete();

       $this->dataApi['success'] = $arrayReturn;
       return $this->dataApi;
   }

   public function isCpfOrCnpj(String $value)
   {
        if(strlen($value) === 11){
            return 'cpf';
        }else if(strlen($value) === 14){
            return 'cnpj';
        }

   }
   public function determineAge(String $dateTime)
   {
        $birth = $dateTime;
        $date = new DateTime($birth);
        $currentYear = new DateTime();
        $interval = $currentYear->diff($date);
        return $interval->y;
   }

   public function fallback()
   {
        $this->dataApi['error'] = 'Rota não aplicada';

        return $this->dataApi;
   }
}
