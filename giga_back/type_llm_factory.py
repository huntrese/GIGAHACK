from llm_factory import get_llm
from reader import read_json

change_subscription_prompt = "You are a professional customer assistant, given the following general subscription plans available at the company, and the users desires, and requirements you must give him relevant advice on which plan suits him better."

incomplete_info_prompt = "Task: Formulate a single, additional question in Romanian that will help pinpoint the issue the user is encountering. Respond in Romanian"

normal_prompt = "You must formulate a response for the user inquity with thje following data as reference, keep it formal and coherent!"
template = read_json("support_ro.json")
template = template["script_support"]
llm = get_llm("server")

def change_subscription(llm, prompt, history={}, plans={}):
    return llm.query(prompt + f"History: {history}" + f"Plans: {plans}")

def incomplete_info(llm, prompt, history={}):
    return llm.finetune_response(prompt + f"History: {history}")

def normal(llm, prompt, user_query, prompt_type):
    
    answer_template = template[prompt_type]
    return llm.query(prompt + f"User Query: {user_query}" + f"Response Template: {answer_template}")



def answer_based_on_type(user_query, prompt_type):
    match(prompt_type):
        case "SCHIMB DE ABONAMENT":
            ans= change_subscription(llm, change_subscription_prompt, {}, {})
            return ans
        case "DONT KNOW":
            ans= incomplete_info(llm, incomplete_info_prompt, {})
            return ans
        case _:
            ans= normal(llm, normal_prompt, user_query, prompt_type)+"script_support:"+str(template[prompt_type])
            return llm.finetune_response(ans)